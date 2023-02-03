import { IonHeader, IonButtons, IonFooter, IonGrid, IonRow, IonButton, IonIcon, IonContent, IonLabel, IonImg } from "@ionic/react";
import { useRSelection } from "../../../../../packages/database/features/utils/utilityHooks";
import HotspotSwiper from "./HotspotSwiper";
import { ScreenOrientation } from "@awesome-cordova-plugins/screen-orientation";
import { useEffect } from "react";
import useCamera from "../../../../../packages/camera/features/CameraCustomHook";
import "./openedCameraTakePhoto.scss";

const OpenedCameraTakePhoto = ({ setHidePageContent }) => {
    const [editCurrentSelection, getCurrentSelection] = useRSelection();
    const camera = useCamera();

    const closeCameraHandler = async () => {
        setHidePageContent(false);
        await camera.stopCamera();
        editCurrentSelection('refresh');
    }

    useEffect(() => {
        // ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.LANDSCAPE);

    }, []);
    const closePicHandler= (e) =>{
        const x = e.target.parentElement.parentElement.classList.remove('show');
    }
    return (
        <>
            <div className="hide-content">
                <IonHeader className="camera-header">
                    <IonButtons>
                        <IonButton onClick={closeCameraHandler}><IonIcon src='/assets/svgs/cancel.svg' /></IonButton>
                    </IonButtons>
                </IonHeader>
                <div className="container">
                    <IonLabel>
                        Please rotate your device to the left to take pictures
                    </IonLabel>
                    <IonIcon icon="/assets/svgs/screen-rotate.svg"></IonIcon>
                </div>
            </div>
            <IonHeader className="camera-header">
                <IonButtons>
                    <IonButton onClick={closeCameraHandler}><IonIcon src='/assets/svgs/cancel.svg' /></IonButton>
                </IonButtons>
            </IonHeader>
            <IonContent>
                <div className={'full-image-container'}>

                        <IonButton fill={'clear'} onClick={closePicHandler}>
                            <IonIcon icon={'/assets/svgs/cancel.svg'}></IonIcon>
                        </IonButton>

                </div>
            </IonContent>
            <IonFooter className="opaque-bg camera-footer">
                <IonGrid>
                    <IonRow className="ion-align-items-center">
                        <HotspotSwiper setHidePageContent={setHidePageContent}></HotspotSwiper>
                    </IonRow>
                </IonGrid>

            </IonFooter>
        </>
    )
}

export default OpenedCameraTakePhoto