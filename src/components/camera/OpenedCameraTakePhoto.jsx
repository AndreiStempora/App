import { IonHeader, IonButtons, IonFooter, IonGrid, IonRow, IonButton, IonIcon, IonContent, IonLabel } from "@ionic/react";
import { useRSelection } from "../../packages/database/features/utils/utilityHooks";
import HotspotSwiper from "./HotspotSwiper";
import { ScreenOrientation } from "@awesome-cordova-plugins/screen-orientation";
import { useEffect } from "react";
import "./openedCameraTakePhoto.scss";

const OpenedCameraTakePhoto = ({ camera, setHidePageContent }) => {
    const [editCurrentSelection, getCurrentSelection] = useRSelection();

    const closeCameraHandler = async () => {
        await camera.stopCamera();
        editCurrentSelection({ cameraOn: false });
        setHidePageContent(false);
        ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT);
    }

    useEffect(() => {
        // ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.LANDSCAPE);
        editCurrentSelection({ cameraOn: true });
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
                        <HotspotSwiper camera={camera}></HotspotSwiper>
                    </IonRow>
                </IonGrid>

            </IonFooter>
        </>
    )
}

export default OpenedCameraTakePhoto