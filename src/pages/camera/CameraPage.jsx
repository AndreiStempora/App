import { IonPage, IonItem,IonList, IonCheckbox, IonHeader, IonLabel, IonContent, IonButton, IonFab, IonFabButton, IonIcon, IonItemSliding, IonSegment, IonSegmentButton } from '@ionic/react';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { useEffect, useState } from 'react';
import Page from '../../components/page/Page';
import './cameraPage.scss';

const CameraPage = () => {
    const cameraPreviewOptions = {
        position: 'rear',
        parent: 'cameraPreview',
        className: 'cameraPreview',
        toBack: true,
    };
    useEffect(() => {
        CameraPreview.stop().then(() => {
            CameraPreview.start(cameraPreviewOptions);
        })
        // console.log('red')
    }, []);


    return (
        <Page pageClass={"cameraPage"}>
            {/* <IonHeader>
                <div>CameraPage</div>
            </IonHeader> */}
            <IonContent>
                <div id="cameraPreview" className='cameraPreview'></div>
                <div className='checkmarks'>
                    <IonList>
                        <IonItem>
                            <IonCheckbox indeterminate='true'  color="danger"></IonCheckbox>
                            <IonCheckbox indeterminate='true'  color="danger"></IonCheckbox>
                            <IonCheckbox indeterminate='true'  color="danger"></IonCheckbox>
                            <IonCheckbox indeterminate='true'  color="danger"></IonCheckbox>
                            <IonCheckbox indeterminate='true'  color="danger"></IonCheckbox>
                            <IonCheckbox indeterminate='true'  color="danger"></IonCheckbox>
                            <IonCheckbox indeterminate='true'  color="danger"></IonCheckbox>
                            <IonCheckbox indeterminate='true'  color="danger"></IonCheckbox>
                        </IonItem>
                    </IonList>
                </div>
                <IonSegment  scrollable value="camera">
                    <IonSegmentButton value="aaa">
                        <IonLabel>AAA</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton checked value="bbb">
                        <IonLabel>bbbbbbbbbb</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="ccc">
                        <IonLabel>ccccc</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="ddd">
                        <IonLabel>ddd</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="eee">
                        <IonLabel>eeeeeeeeeeeeeeee</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="fff">
                        <IonLabel>ffff</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton disabled='true' value="ggg">
                        <IonLabel>gggggggggggggggggggggggg</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="hhh">
                        <IonLabel>hhhrrrr</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
            </IonContent>
        </Page>
    )
}

export default CameraPage