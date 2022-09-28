import { IonPage, IonGrid, IonRow, IonCol, IonItem, IonList, IonCheckbox, IonHeader, IonLabel, IonContent, IonFooter, IonButton, IonFab, IonFabButton, IonIcon, IonItemSliding, IonSegment, IonSegmentButton } from '@ionic/react';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { useEffect, useState } from 'react';
import { SwiperCarousel } from '../../swiper';
import './cameraControls.scss';

const CameraControls = ({ filesPath }) => {
    const [src, setSrc] = useState(null);
    const [swiperInstance, setSwiperInstance] = useState(null);

    const takePicture = async () => {
        console.log(swiperInstance);
        // const result = await CameraPreview.capture({ quality: 100 });
        // console.log(filesPath, 'filesPath');
        // console.log(result);
        // let res = 'file://' + result.value;
        // console.log(res);
        // const contents = await Filesystem.readFile({ path: res });
        // const base64PictureData = "data:image/jpg;base64," + contents.data;



        // setPic(base64PictureData);
        // let x = (await Filesystem.getUri({directory: Directory.Data, path: 'photos'})).uri
        // console.log(x,res);
        // let newUri = (await Filesystem.copy({from:res,to:x+`/${(new Date()).getTime()}.jpg`})).uri;
        // console.log(newUri);
        // async function createFile(){
        //     let response = await fetch(newUri);
        //     let data = await response.blob();
        //     let metadata = {
        //       type: 'image/jpg'
        //     };
        //     let file = new File([data], "test.jpg", metadata);
        //     console.log(file);
        //     // ... do something with the file or return it
        //   }
        //   createFile();
    }
    // const startCamera = async () => {
    //     await CameraPreview.start(cameraPreviewOptions);
    //     setCameraOn(true);
    // }
    // const stopCamera = async () => {
    //     await CameraPreview.stop();
    //     setCameraOn(false);
    // }
    return (
            <IonFooter>
                <IonGrid>
                    <IonRow className="ion-align-items-center">
                        <IonCol size='3'>
                            <div className="img-container" onClick={()=>{console.log('click')}}>
                                <img src={src} alt="img missing" />
                            </div>
                        </IonCol>
                        <IonCol size='6' className="ion-text-center">
                            <IonButton className='take-picture-btn' onClick={takePicture}></IonButton>
                        </IonCol>
                        <IonCol size='12'>
                            <SwiperCarousel setSrc={setSrc} setSwiper={setSwiperInstance} />
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {/* <IonButton onClick={startCamera}>Start</IonButton>
                <IonButton onClick={stopCamera}>Stop</IonButton> */}

            </IonFooter>
        
    )
}

export default CameraControls