import { IonHeader, IonButtons, IonFooter, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonContent } from "@ionic/react"
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation';
import { useEffect, useState } from "react";
import HotspotSwiper from "./HotspotSwiper";
import { useAtom } from "jotai";
import { user } from "../../services/user/user";
import "./openedCameraTakePhoto.scss";

const OpenedCameraTakePhoto = ({camera,setHidePageContent}) => {
    const closeCameraHandler = async() => {
        await camera.stopCamera();
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