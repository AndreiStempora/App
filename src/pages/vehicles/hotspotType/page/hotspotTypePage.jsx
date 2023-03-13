import { Page, CustomHeader, CustomContent } from "../../../../components/page/Page";
import { IonButtons, IonTitle, IonButton, IonLabel, IonList, IonIcon } from "@ionic/react";
import { useState, useEffect } from "react";
import { useDbRequest } from "../../../../packages/database";
import { useRSelection, useHotspot } from "../../../../services/customHooks/utilityHooks";
import OpenedCameraTakePhoto from "../components/camera/OpenedCameraTakePhoto";
import useCamera from "../../../../packages/camera/features/CameraCustomHook";
import FooterAddVehicle from "../../../../components/page/pageMainComponents/footers/FooterAddVehicle";
import HotspotWithPic from "../components/hotspotWithPhotoItem/HotspotWithPic";
import CustomBackButton from "../../../../components/buttons/CustomBackButton";
import { useHistory } from "react-router";
import { FS } from "../../../../packages/filesystem";
import "./hotspotTypePage.scss";
import  useRefreshCurrentPage from "../../../../services/customHooks/RefreshCurrentPage";

const VehiclePhotos = () => {
    const dbRequest = useDbRequest();
    const hotspotHook = useHotspot();
    const [setCurrentSelection, getCurrentSelection] = useRSelection();
    const [hidePageContent, setHidePageContent] = useState(false);
    const [hotspotsWithPhoto, setHotspotsWithPhotos] = useState([]);
    const history = useHistory();
    const camera = useCamera();
    const [imageLoading, setImageLoading] = useState(true);
    const { refreshPage } = useRefreshCurrentPage();

    const openCameraHandler = async () => {
        setHidePageContent(true);
        await camera.startCamera();
    };

    const getCurrentPhotos = async () => {
        const hotspotsWithPhotoLocations = await hotspotHook.getHotspotsWithPhotos(getCurrentSelection().hotspot_type);
        let newEl = Promise.all(hotspotsWithPhotoLocations.map(async (hotspotWithPhoto) => {
            if (hotspotWithPhoto[1] !== undefined) {
                const image = await FS.showPicture(hotspotWithPhoto[1]?.image_data)
                hotspotWithPhoto[1] = image;
            } else {
                hotspotWithPhoto[1] = null;
            }
            return hotspotWithPhoto;
        }));

        setHotspotsWithPhotos(await newEl);
        setImageLoading(false);
    };

    useEffect(() => {
        refreshPage(history, '/vehicle-photos', getCurrentPhotos);
    }, [history.location.pathname
        // ,getCurrentSelection().refreshPage
    ]);

    // useEffect(() => {
    //     getCurrentPhotos();
    // }, []);
    //     (async () => {
    //         const hotspotsWithPhotoLocations = await hotspotHook.getHotspotsWithPhotos(getCurrentSelection().hotspot_type);
    //         let newEl = Promise.all(hotspotsWithPhotoLocations.map(async (hotspotWithPhoto) => {
    //             if (hotspotWithPhoto[1] !== undefined) {
    //                 const image = await FS.showPicture(hotspotWithPhoto[1]?.image_data)
    //                 hotspotWithPhoto[1] = image;
    //             } else {
    //                 hotspotWithPhoto[1] = null;
    //             }
    //             return hotspotWithPhoto;
    //         }));
    //
    //         setHotspotsWithPhotos(await newEl);
    //         setImageLoading(false);
    //     })();
    // }, [
    //     getCurrentSelection().refreshPage
    // ]);

    const backButtonHandler = async () => {
        setCurrentSelection('refresh');
        history.push('/vehicle-details');
    };

    return (
        <Page pageClass={`vehiclePhotos ${hidePageContent ? 'camera-open' : ''}`}>
            {!hidePageContent ?
                (
                    <>
                        <CustomHeader>
                            <IonButtons slot="start">
                                <CustomBackButton extraFunction={backButtonHandler} />
                            </IonButtons>
                            <IonTitle className='ion-text-center'>Vehicle Photos</IonTitle>
                        </CustomHeader>
                        <CustomContent>
                            <IonList>
                                {hotspotsWithPhoto?.map((hotspotWithPhoto, index) => (
                                    <HotspotWithPic
                                        key={index}
                                        imageLoading={imageLoading}
                                        hotspotWithPhoto={hotspotWithPhoto}
                                        openCamera={openCameraHandler}
                                    >
                                    </HotspotWithPic>
                                ))}
                            </IonList>
                            <div className="centered-camera-button">
                                <IonButtons >
                                    <IonButton onClick={openCameraHandler}><IonIcon icon='/assets/svgs/camera.svg'></IonIcon></IonButton>
                                </IonButtons>
                                <IonLabel>Start taking photos of your vehicle</IonLabel>

                            </div>

                        </CustomContent>
                        <FooterAddVehicle photoBtn={true} />
                    </>
                ) : (
                    <OpenedCameraTakePhoto
                        setHidePageContent={setHidePageContent} camera={camera}
                    />
                )}
        </Page>
    )
}

export default VehiclePhotos