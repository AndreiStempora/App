import { Page, CustomHeader, CustomContent } from "../../../components/page/Page";
import { IonButtons, IonTitle, IonButton, IonLabel, IonBackButton, IonList, IonIcon, useIonViewWillEnter } from "@ionic/react";
import { useState, useEffect } from "react";
import { useDbRequest, hotspotsService, imagesService } from "../../../packages/database";
import { useRSelection, useHotspot } from "../../../packages/database/features/utils/utilityHooks";
import OpenedCameraTakePhoto from "../../../components/camera/OpenedCameraTakePhoto";
import useCamera from "../../../packages/camera/features/CameraCustomHook";
import FooterAddVehicle from "../../../components/page/pageMainComponents/footers/FooterAddVehicle";
import HotspotWithPic from "./hotspotWithPhotoItem/HotspotWithPic";
import CustomBackButton from "../../../components/buttons/CustomBackButton";
import { useHistory } from "react-router";
import "./vehiclePhotos.scss";


const VehiclePhotos = () => {
    const dbRequest = useDbRequest();
    const hotspotHook = useHotspot();
    const [editCurrentSelection, getCurrentSelection] = useRSelection();
    const [hidePageContent, setHidePageContent] = useState(false);
    const [hotspotsWithPhoto, setHotspotsWithPhotos] = useState([]);
    const history = useHistory();
    const camera = useCamera();
    const [refresh, setRefresh] = useState(false);

    const openCameraHandler = async () => {
        setHidePageContent(true);
        console.log('open camera handler');
        // await camera.startCamera();
    };

    useEffect(() => {
        (async () => {
            if (getCurrentSelection().cameraOn) {
                setHidePageContent(true);
                console.log('effect camera start')
                await camera.startCamera();
            }
        })();

        if (hidePageContent === false) {
            (async () => {
                const currentHotspotsWithPhotos = await hotspotHook.getHotspotsWithPhotos(getCurrentSelection().hotspot_type);
                setHotspotsWithPhotos(currentHotspotsWithPhotos);
            })();
        }
    }, [hidePageContent]);

    useIonViewWillEnter(() => {
        setRefresh(true);
    });

    useEffect(() => {
        (async () => {
            const currentHotspotsWithPhotos = await hotspotHook.getHotspotsWithPhotos(getCurrentSelection().hotspot_type);
            console.log(getCurrentSelection().hotspot_type, 'hotspot type', currentHotspotsWithPhotos);

            setHotspotsWithPhotos(currentHotspotsWithPhotos);
            console.log('entered vehicle photos')
        })();
    }, [refresh]);
    return (
        <Page pageClass={`vehiclePhotos ${hidePageContent ? 'camera-open' : ''}`}>
            {!hidePageContent ?
                (
                    <>
                        <CustomHeader>
                            <IonButtons slot="start">
                                <CustomBackButton //extraFunction={backButtonHandler} 
                                    href={'vehicle-details'}
                                />
                            </IonButtons>
                            <IonTitle className='ion-text-center'>Vehicle Photos</IonTitle>
                        </CustomHeader>
                        <CustomContent>
                            <IonList>
                                {hotspotsWithPhoto?.map((hotspotWithPhoto, index) => (
                                    <HotspotWithPic
                                        key={index}
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
                    <OpenedCameraTakePhoto setHidePageContent={setHidePageContent} camera={camera} />
                )}
        </Page>
    )
}

export default VehiclePhotos