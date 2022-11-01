import { IonHeader, IonButtons, IonFooter, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonContent } from "@ionic/react"
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation';
import { useEffect, useState } from "react";

const OpenedCameraTakePhoto = ({camera,setHidePageContent}) => {

    const closeCameraHandler = async() => {
        setHidePageContent(false);
        await camera.stopCamera();
    }

    const takePictureHandler = async() => {
        camera.takePicture();
    }

    useEffect(() => {
        ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT);
        // console.log(ScreenOrientation.onChange(console.log('changed')));
        // window.addEventListener("orientationchange", function(){
        //     console.log(Screen.orientation.type); // e.g. portrait
        // });
    }, []);

    return (
        <>
            <IonHeader>
                <IonButtons>
                    <IonButton onClick={closeCameraHandler}><IonIcon src='/assets/svgs/previous.svg'/></IonButton>
                </IonButtons>
            </IonHeader>
            <IonContent>

            </IonContent>
            <IonFooter>
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
                            {/* <SwiperCarousel setSrc={setSrc} setSwiper={setSwiperInstance} /> */}
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonFooter>
        </>
    )
}

export default OpenedCameraTakePhoto