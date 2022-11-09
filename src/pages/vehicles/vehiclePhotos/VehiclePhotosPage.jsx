import { Page, CustomHeader, CustomContent } from "../../../components/page/Page";
import { IonButtons, IonTitle, IonButton, IonLabel, IonBackButton, IonList, IonIcon } from "@ionic/react";
import { useState, useEffect } from "react";
import { useDbRequest, hotspotsService, imagesService } from "../../../packages/database";
import { useRSelection, useHotspot } from "../../../packages/database/features/utils/utilityHooks";
import OpenedCameraTakePhoto from "../../../components/camera/OpenedCameraTakePhoto";
import useCamera from "../../../packages/camera/features/CameraCustomHook";
import FooterAddVehicle from "../../../components/footers/FooterAddVehicle";
import HotspotWithPic from "./hotspotWithPhotoItem/HotspotWithPic";
import "./vehiclePhotos.scss";


const VehiclePhotos = () => {
    const dbRequest = useDbRequest();
    const [ , getCurrentHotspotsByType, getCurrentHotspotPhoto, getHotspotsWithPhoto ] = useHotspot();
    const [editCurrentSelection, getCurrentSelection] = useRSelection();
    const [hidePageContent, setHidePageContent] = useState(false);
    const [hotspotsWithPhoto, setHotspotsWithPhotos] = useState([]);
    const camera = useCamera();

    const openCameraHandler = async () => {
        setHidePageContent(true);
        await camera.startCamera();
    };

    useEffect(() => {
        if(hidePageContent === false){
            (async () => {
                const currentHotspotsWithPhotos = await getHotspotsWithPhoto(getCurrentSelection().hotspot_type);
                setHotspotsWithPhotos(currentHotspotsWithPhotos);
            })();
        }
    }, [hidePageContent]);


    return (
        <Page pageClass={`vehiclePhotos ${hidePageContent ? 'camera-open' : ''}`}>` 
            {!hidePageContent ? 
            (             
                <>
                    <CustomHeader>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/dealerships" icon="assets/svgs/previous.svg"></IonBackButton>
                        </IonButtons>
                        <IonTitle className='ion-text-center'>Vehicle Photosred</IonTitle>
                    </CustomHeader>
                    <CustomContent>
                        <IonList>
                            {hotspotsWithPhoto?.map((hotspotWithPhoto,index) => (
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
            <OpenedCameraTakePhoto setHidePageContent={setHidePageContent} camera={camera}/>
            )}
        </Page>
    )
}

export default VehiclePhotos