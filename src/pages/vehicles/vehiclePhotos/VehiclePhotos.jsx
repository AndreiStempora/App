import { Page, CustomHeader, CustomContent, CustomFooter,  } from "../../../components/page/Page";
import { IonButtons, IonTitle, IonButton, IonLabel, IonBackButton, IonList, IonIcon, IonHeader, IonFooter, IonGrid, IonContent, IonCol, IonRow, } from "@ionic/react";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import "./vehiclePhotos.scss";
import FooterAddVehicle from "../../../components/footers/FooterAddVehicle";
import useCamera from "../../../packages/camera/features/CameraCustomHook";
import OpenedCameraTakePhoto from "../../../components/camera/OpenedCameraTakePhoto";
import { useDbRequest, hotspotsService, imagesService } from "../../../packages/database";
import { useAtom } from "jotai";
import { user } from "../../../services";
import HotspotItemWithImage from "../../../components/vehicleComponents/hotspotsComponents/HotspotWithPic";


const VehiclePhotos = () => {
    const dbRequest = useDbRequest();
    const [currentSelection, setCurrentSelection] = useAtom(user.userCurrentSelections);
    const [hidePageContent, setHidePageContent] = useState(false);
    const [hotspots, setHotspots] = useState([]);

    const camera = useCamera();

    const cameraHandler = async () => {
        setHidePageContent(true);
        await camera.startCamera();
    };

    useEffect(() => {
        (async () => {
            const existingHotspots = await dbRequest.requestFunction(async () => await hotspotsService.getAllHotspotsByDealershipIdAndHotspotType([currentSelection.dealership_id, currentSelection.hotspot_type]));
            setHotspots(existingHotspots);

        })();
    }, []);


    return (
        <Page pageClass={`vehiclePhotos ${hidePageContent ? 'camera-open' : ''}`}>` 
            {!hidePageContent ? 
            (             
                <>
                    <CustomHeader>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/dealerships" icon="assets/svgs/previous.svg"></IonBackButton>
                        </IonButtons>
                        <IonTitle className='ion-text-center'>Vehicle Photos</IonTitle>
                    </CustomHeader>
                    <CustomContent>
                        <IonList>
                            {hotspots?.map((hotspot,index) => (
                                <HotspotItemWithImage key={index} hotspot={hotspot}></HotspotItemWithImage>
                            ))}
                        </IonList>
                        <div className="centered-camera-button">
                            <IonButtons >
                                <IonButton onClick={cameraHandler}><IonIcon icon='/assets/svgs/camera.svg'></IonIcon></IonButton>
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