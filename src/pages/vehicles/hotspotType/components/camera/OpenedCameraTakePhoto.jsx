import { IonButtons, IonFooter, IonGrid, IonRow, IonButton, IonIcon, IonContent, IonLabel, IonImg } from "@ionic/react";
import { useRSelection } from "../../../../../services/customHooks/utilityHooks";
import { CustomContent, CustomHeader } from "../../../../../components/page/Page";
import HotspotSwiper from "./HotspotSwiper";
import useCamera from "../../../../../packages/camera/features/CameraCustomHook";
import "./openedCameraTakePhoto.scss";
import { useLanguage } from "../../../../../packages/multiLanguage";

const OpenedCameraTakePhoto = ({ setHidePageContent }) => {
      const [translate] = useLanguage();
    const [editCurrentSelection, getCurrentSelection] = useRSelection();
    const camera = useCamera();

    const closeCameraHandler = async () => {
        setHidePageContent(false);
        await camera.stopCamera();
        editCurrentSelection('refresh');
    }

    const closePicHandler= () =>{
        document.querySelector('.vehiclePhotos').classList.remove("show");
    }
    return ( 
        <>
                <CustomHeader className="camera-header">
                    <IonButtons>
                        <IonButton onClick={closeCameraHandler}><IonIcon src='/assets/svgs/cancel.svg' /></IonButton>
                    </IonButtons>
                </CustomHeader>
                <IonContent>
                    <div className='full-image-container'>
                            <IonButton fill={'clear'} onClick={closePicHandler}>
                                <IonIcon icon={'/assets/svgs/cancel.svg'}></IonIcon>
                            </IonButton>
                            <IonImg className="image-full"></IonImg>
                    </div>
                    <div className="forbidden-container">
                        <div className="forbidden-message">
                            <IonLabel>
                                  {translate("Please rotate your device to the left to take pictures")}
                            </IonLabel>
                            <IonIcon icon="/assets/svgs/screen-rotate.svg"></IonIcon>

                        </div>
                    </div>
                </IonContent>
                <IonFooter className="opaque-bg camera-footer">
                    <IonGrid>
                        <IonRow className="ion-align-items-center">
                            <HotspotSwiper //setHidePageContent={setHidePageContent}
                            ></HotspotSwiper>
                        </IonRow>
                    </IonGrid>

                </IonFooter>
            </>
            
        
    )
}

export default OpenedCameraTakePhoto