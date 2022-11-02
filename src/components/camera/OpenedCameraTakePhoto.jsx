import { IonHeader, IonButtons, IonFooter, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonContent } from "@ionic/react"
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation';
import { useEffect, useState } from "react";
import HotspotSwiper from "./HotspotSwiper";
import "./openedCameraTakePhoto.scss";

const OpenedCameraTakePhoto = ({camera,setHidePageContent}) => {
    const [hotspot_id, setHotspot_id] = useState(3);
    const [forcedOrientation, setForcedOrientation] = useState(false);

    const closeCameraHandler = async() => {
        await camera.stopCamera();
        setHidePageContent(false);
    }

    const takePictureHandler = async() => {
        camera.takePicture();
    }

    useEffect(() => {
        // ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT);
        // console.log(ScreenOrientation.onChange(console.log('changed')));
        // setHotspot_id(3);

    }, []);

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
                        <IonCol size='3'>
                            <div className="img-container" onClick={() => { console.log('click') }}>
                                {/* <img src={src} alt="img missing" /> */}
                            </div>
                        </IonCol>
                        <IonCol size='6' className="ion-text-center">
                            <IonButton className='take-picture-btn'
                                onClick={takePictureHandler}
                            //</IonCol>onClick={takePicture}
                            ></IonButton>
                        </IonCol>
                        <IonCol size='12'>
                            <HotspotSwiper hotspot_id={hotspot_id} setHotspot_id={setHotspot_id}></HotspotSwiper>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonFooter>
        </>
    )
}

export default OpenedCameraTakePhoto