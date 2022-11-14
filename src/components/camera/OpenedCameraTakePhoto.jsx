import { IonHeader, IonButtons, IonFooter, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonContent } from "@ionic/react";
import { useRSelection } from "../../packages/database/features/utils/utilityHooks";
import HotspotSwiper from "./HotspotSwiper";
import "./openedCameraTakePhoto.scss";

const OpenedCameraTakePhoto = ({camera,setHidePageContent}) => {
    const [ editCurrentSelection, getCurrentSelection ] = useRSelection();

    const closeCameraHandler = async() => {
        await camera.stopCamera();
        editCurrentSelection({cameraOn: false});
        setHidePageContent(false);
    }

    return (
        <>
            <IonHeader className="opaque-bg">
                <IonButtons>
                    <IonButton onClick={closeCameraHandler}><IonIcon src='/assets/svgs/previous.svg'/></IonButton>
                </IonButtons>
            </IonHeader>
            <IonContent>

            </IonContent>
            <IonFooter className="opaque-bg">
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