import { Page, CustomHeader, CustomContent, CustomFooter,  } from "../../../components/page/Page";
import { IonButtons, IonTitle, IonButton, IonLabel, IonBackButton, IonIcon, IonHeader, IonFooter, IonGrid, IonContent, IonCol, IonRow, } from "@ionic/react";
import { useHistory } from "react-router";
import { useState } from "react";
import "./vehiclePhotos.scss";
import FooterAddVehicle from "../../../components/footers/FooterAddVehicle";
import useCamera from "../../../packages/camera/features/CameraCustomHook";
import OpenedCameraTakePhoto from "../../../components/camera/OpenedCameraTakePhoto";
import { ScreenOrientation } from "@awesome-cordova-plugins/screen-orientation";

const VehiclePhotos = () => {
    const [photosOfVehicle, setPhotosOfVehicle] = useState([]);
    const [hidePageContent, setHidePageContent] = useState(false);
    const camera = useCamera();
    

    const cameraHandler = async () => {
        setHidePageContent(true);
        await camera.startCamera();
        // ScreenOrientation.unlock();
    };


    return (
        <Page pageClass={`vehiclePhotos ${hidePageContent ? 'camera-open' : ''}`}>` 
            {!hidePageContent ? 
            (             
                <>
                    <CustomHeader>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/dealerships" icon="assets/svgs/previous.svg"></IonBackButton>
                        </IonButtons>
                        <IonTitle className='ion-text-center'> Capture</IonTitle>
                    </CustomHeader>
                    <CustomContent>
                        {/* {!photosOfVehicle? */}
                        <div className="centered-camera-button">
                            <IonButtons >
                                <IonButton onClick={cameraHandler}><IonIcon icon='/assets/svgs/camera.svg'></IonIcon></IonButton>
                            </IonButtons>
                            <IonLabel>Start taking photos of your vehicle</IonLabel>
                            
                        </div>
                        {/* :null */}
                        {/* } */}
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