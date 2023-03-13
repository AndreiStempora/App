import { useHotspot, useRSelection, useDeleteUpload } from "../../../../services/customHooks/utilityHooks";
import { IonButtons, IonImg, IonSpinner, IonContent, useIonAlert } from "@ionic/react";
import { useState, useEffect } from "react";
import { Page, CustomHeader } from "../../../../components/page/Page";
import { useHistory } from "react-router";
import { FS } from "../../../../packages/filesystem/index";
import CustomBackButton from "../../../../components/buttons/CustomBackButton";
import FooterDeleteUpload from "../../../../components/page/pageMainComponents/footers/FooterDeleteUpload";
import useCamera from "../../../../packages/camera/features/CameraCustomHook";
import { imagesService, useDbRequest } from "../../../../packages/database";
import { network } from "../../../../packages/network";
import FileUploader from "../../../../components/uploader/FileUploader";

const HotspotPhotoPage = () => {
    const history = useHistory();
    const [image, setImage] = useState();
    const [imageLoading, setImageLoading] = useState(true);
    const hotspotHook = useHotspot();
    const photoOps = useDeleteUpload();
    const camera = useCamera();
    const dbRequest = useDbRequest();
    const [presentAlert] = useIonAlert();
    const [uploading, setUploading] = useState(false);
    const [elementsForUpload, setElementsForUpload] = useState();
    const [editCurrentSelection, getCurrentSelection] = useRSelection();

    const getPicture = async () => {
        try {
            setImageLoading(true);
            const imageObj = await hotspotHook.getCurrentHotspotPhoto(getCurrentSelection().hotspot_id);
            if (imageObj.length > 0) {
                const img = await FS.showPicture(imageObj[0].image_data);
                setImage(img);
            } else {
                history.push('/hotspot-photos');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setImageLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            await getPicture();
        })();
    }, []);

    const deleteHandler = () => {
        presentAlert({
            header: 'Delete Photo',
            message: 'Are you sure you want to delete this photo?',
            buttons: [
                'Cancel',
                {
                    text: 'Delete',
                    handler: async () => {
                        await dbRequest.requestFunction(async () => await imagesService.deleteImageById([getCurrentSelection().photo_id])).then(() => {
                            editCurrentSelection('refresh');
                            history.push('/vehicle-photos')
                        })
                    }
                }
            ]
        })
        console.log('delete');
    }
    const retakeHandler = async () => {
        editCurrentSelection({ cameraOn: true, refreshPage: !getCurrentSelection().refreshPage })
        await camera.startCamera();
        history.push('/vehicle-photos')
    }
    const uploadHandler = async () => {
        if (await network.getCurrentNetworkStatus()) {
            presentAlert({
                header: 'Upload Photo',
                message: 'Are you sure you want to upload this photo?',
                buttons: [
                    'Cancel',
                    {
                        text: 'Upload',
                        handler: async () => {
                            const image = (await hotspotHook.getCurrentHotspotPhoto(getCurrentSelection().hotspot_id))[0];
                            // console.log(image);
                            setElementsForUpload(image);
                            setUploading(true);
                        }
                    }
                ]
            })
        } else {
            presentAlert({
                header: 'No internet connection',
                cssClass: 'custom-alert',
                buttons: [
                    {
                        text: 'Ok',
                        cssClass: 'alert-button-confirm',
                    },
                ],
            })
        }

    }
    return (
        <Page pageClass={"hotspot-photo"}>
            {uploading ?
                <FileUploader
                    elements={elementsForUpload}
                    setUploading={setUploading}
                    uploading={uploading}
                /> : <>
                    <CustomHeader>
                        <IonButtons>
                            <CustomBackButton href={'/vehicle-photos'} extraFunction={
                                () => {
                                    history.push('/vehicle-photos')
                                }
                            }>
                            </CustomBackButton>
                        </IonButtons>
                    </CustomHeader>
                    <IonContent>
                        {imageLoading ? <IonSpinner name="crescent" /> : <IonImg src={image} />}
                    </IonContent>
                    <FooterDeleteUpload del={deleteHandler} retake={retakeHandler} upload={uploadHandler}></FooterDeleteUpload>
                </>}
        </Page>
    )
}

export default HotspotPhotoPage;