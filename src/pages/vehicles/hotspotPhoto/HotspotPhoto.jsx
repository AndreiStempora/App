import { useHotspot, useRSelection, useDeleteUpload } from "../../../packages/database/features/utils/utilityHooks";
import { IonButtons, IonImg, IonSpinner, IonContent } from "@ionic/react";
import { useState, useEffect } from "react";
import { Page, CustomHeader } from "../../../components/page/Page";
import { useHistory } from "react-router";
import { FS } from "../../../packages/filesystem/index";
import CustomBackButton from "../../../components/buttons/CustomBackButton";
import FooterDeleteUpload from "../../../components/page/pageMainComponents/footers/FooterDeleteUpload";


const HotspotPhoto = () => {
    const history = useHistory();
    const [image, setImage] = useState();
    const [imageLoading, setImageLoading] = useState(true);
    const hotspotHook = useHotspot();
    const photoOps = useDeleteUpload();
    const [editCurrentSelection, getCurrentSelection] = useRSelection();

    const getPicture = async () => {
        try {
            const imageObj = await hotspotHook.getCurrentHotspotPhoto(getCurrentSelection().hotspot_id);
            if (imageObj.length > 0) {
                const img = await FS.showPicture(imageObj[0].image_data);
                setImage(img);
            } else {
                setImage(null);
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
        console.log('delete');
    }
    const retakeHandler = () => {
        console.log('retake');
    }
    const uploadHandler = async () => {
        const image = (await hotspotHook.getCurrentHotspotPhoto(getCurrentSelection().hotspot_id))[0];
        let photo = await photoOps.uploadImage(image);
    }
    return (
        <Page pageClass={"hotspot-photo"}>
            <CustomHeader>
                <IonButtons>
                    <CustomBackButton href={'./vehicle-photos'} extraFunction={() => editCurrentSelection({ cameraOn: true })}></CustomBackButton>
                </IonButtons>
            </CustomHeader>
            <IonContent>
                {imageLoading ? <IonSpinner name="crescent" /> : <IonImg src={image} />}
            </IonContent>
            <FooterDeleteUpload del={deleteHandler} retake={retakeHandler} upload={uploadHandler}></FooterDeleteUpload>
        </Page>
    )
}

export default HotspotPhoto;