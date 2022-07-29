import React from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { useEffect, useState } from 'react';
import './cameraPage.scss';

const CameraPage = () => {
    useEffect(() => {
        const cameraPreviewOptions = {
            position: 'rear',
            parent: 'cameraPreview',
            className: 'cameraPreview',
            toBack: true,


        };
        //   CameraPreview.stop()
        CameraPreview.start(cameraPreviewOptions);
        // console.log('red')
    }, []);


    return (
        <IonPage>
            <IonHeader>
                <div>CameraPage</div>
            </IonHeader>
            <IonContent>
                <div id="cameraPreview" className='cameraPreview'></div>
                <IonButton onClick={console.log('red')} className="red">button</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default CameraPage