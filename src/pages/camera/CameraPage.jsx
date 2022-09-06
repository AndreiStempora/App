import { IonPage, IonItem,IonList, IonCheckbox, IonHeader, IonLabel, IonContent, IonButton, IonFab, IonFabButton, IonIcon, IonItemSliding, IonSegment, IonSegmentButton } from '@ionic/react';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { useEffect, useState } from 'react';
import Page from '../../components/page/Page';
import './cameraPage.scss';

const CameraPage = () => {
    const [cameraOn,setCameraOn] = useState(false);

    const cameraPreviewOptions = {
        position: 'rear',
        parent: 'cameraPreview',
        className: 'cameraPreview',
        toBack: true,
        storeToFile: true,
    };
    const startCamera = async () => {
        try{
            if(!cameraOn){
            await CameraPreview.start(cameraPreviewOptions);
            setCameraOn(true);
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        startCamera();

    }, []);

    const takePicture = async () => {
        try{
            const image = await CameraPreview.capture({quality: 100});
            console.log(image);
            // console.log(x);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Page pageClass={"cameraPage"}>
            {/* <IonHeader>
                <div>CameraPage</div>
            </IonHeader> */}
            <IonContent>
                <div id="cameraPreview" className='cameraPreview'></div>
                {/* <div className='checkmarks'>
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
                </div> */}
                {/* <IonSegment  scrollable value="camera">
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
                </IonSegment> */}

                <IonButton onClick={takePicture}>Take Pic</IonButton>
            </IonContent>
        </Page>
    )
}

export default CameraPage