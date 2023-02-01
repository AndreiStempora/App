import { IonHeader, IonButtons, IonFooter, IonGrid, IonRow, IonButton, IonIcon, IonContent, IonLabel } from "@ionic/react";
import { useRSelection } from "../../packages/database/features/utils/utilityHooks";
import HotspotSwiper from "./HotspotSwiper";
import { ScreenOrientation } from "@awesome-cordova-plugins/screen-orientation";
import { useEffect } from "react";
import useCamera from "../../packages/camera/features/CameraCustomHook";
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

    return (
        <>
            <div className="hide-content">
                <div className="container">
                    <IonLabel>
                        Please rotate your device to the left to take pictures
                    </IonLabel>
                    <IonIcon icon="/assets/svgs/screen-rotate.svg"></IonIcon>
                </div>
            </div>
            <IonHeader className="camera-header">
                <IonButtons>
                    <IonButton onClick={closeCameraHandler}><IonIcon src='/assets/svgs/previous.svg' /></IonButton>
                </IonButtons>
            </IonHeader>
            <IonContent>

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