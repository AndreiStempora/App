import { IonPage, IonItem, IonList, IonCheckbox, IonHeader, IonLabel, IonContent, IonButton, IonFab, IonFabButton, IonIcon, IonItemSliding, IonSegment, IonSegmentButton } from '@ionic/react';
// import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { useEffect, useState } from 'react';
import { useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';
import { CameraPreview } from "@awesome-cordova-plugins/camera-preview";
import { FS } from '../../packages/filesystem';
import Page from '../../components/page/Page';

// import 
import './cameraPage.scss';

const CameraPage = () => {
    const [cameraOn, setCameraOn] = useState(false);

    const cameraPreviewOptions = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: CameraPreview.CAMERA_DIRECTION.BACK,
        toBack: true,
        tapPhoto: false,
        tapFocus: true,
        previewDrag: false,
        storeToFile: false,
        disableExifHeaderStripping: false

    };

    useIonViewDidEnter(async () => {
        if (!cameraOn) {
            await CameraPreview.startCamera(cameraPreviewOptions);
            setCameraOn(true);
            console.log("cameraStarted")
        }
    })
    useIonViewWillLeave(async () => {
        await CameraPreview.stopCamera();
        console.log("cameraStopped")
        setCameraOn(false);
    })

    

    // useEffect(() => {

    // }, []);

    let options3 = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: CameraPreview.CAMERA_DIRECTION.BACK,
        toBack: false,
        tapPhoto: true,
        tapFocus: false,
        previewDrag: false,
        storeToFile: false,
        disableExifHeaderStripping: false
    };
    const takePicture = async () => {
        // try {
        //     let x = await CameraPreview.takePicture({ options3 });
        //     let y = "file://" +x[0];

        //     // const blob = await y.blob();
        //     // console.log(blob, "blob");
        //     const reader = new FileReader();
        //     reader.readAsDataURL(y);
        //     let r = new Promise(resolve => {
        //         reader.onloadend = () => {
        //             resolve(reader.result);
        //         };
        //     });

        //     console.log(await r)
            
        //     //get absolute path
        //     // let z = await FS.getUri(y);
        //     // console.log(z);
        

        // } catch (e) {
        //     console.log(e);
        // }
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