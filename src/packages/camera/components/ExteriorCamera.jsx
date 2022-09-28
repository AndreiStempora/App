// import { IonPage, IonItem, IonList, IonCheckbox, IonHeader, IonLabel, IonContent, IonButton, IonFab, IonFabButton, IonIcon, IonItemSliding, IonSegment, IonSegmentButton } from '@ionic/react';
// import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
// import { useEffect, useState } from 'react';
// import { FS } from '../../../packages/filesystem';
// import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
// import PictureSwiper from './PictureSwiper';

// const ExteriorCamera = ({filesPath}) => {
//     const [cameraOn, setCameraOn] = useState(false);

//     const cameraPreviewOptions = {
//         toBack: true,
//         quality: 100,
//         storeToFile: true,
//     };

//     const takePicture = async () => {
//         const result = await CameraPreview.capture({quality:100}); 
//         console.log(filesPath, 'filesPath');     
//         console.log(result);
//         let res = 'file://' + result.value;
//         console.log(res);
//         const contents = await Filesystem.readFile({path: res});
//         const base64PictureData = "data:image/jpg;base64," + contents.data;
//         // setPic(base64PictureData);
//         // let x = (await Filesystem.getUri({directory: Directory.Data, path: 'photos'})).uri
//         // console.log(x,res);
//         // let newUri = (await Filesystem.copy({from:res,to:x+`/${(new Date()).getTime()}.jpg`})).uri;
//         // console.log(newUri);
//         // async function createFile(){
//         //     let response = await fetch(newUri);
//         //     let data = await response.blob();
//         //     let metadata = {
//         //       type: 'image/jpg'
//         //     };
//         //     let file = new File([data], "test.jpg", metadata);
//         //     console.log(file);
//         //     // ... do something with the file or return it
//         //   }
//         //   createFile();
//     }
//     const startCamera = async () => {
//         await CameraPreview.start(cameraPreviewOptions);
//         setCameraOn(true);
//     }
//     const stopCamera = async () => {
//         await CameraPreview.stop();
//         setCameraOn(false);
//     }

//     // useEffect(() => {
//     //     (async () => {
            
//     //         if (!cameraOn) {
//     //             await CameraPreview.start(cameraPreviewOptions);
//     //             console.log('camera started');
//     //             setCameraOn(true);
//     //         }
//     //     })()

//     //     return async () => {
//     //         if (cameraOn) {
//     //             CameraPreview.stop();
//     //             console.log('camera stopped');
//     //             setCameraOn(false);
//     //         }
//     //     }
//     // }, [])

//     return (
//         <>
//             <IonButton onClick={takePicture}>Take Pic</IonButton>
//             <IonButton onClick={startCamera}>Start</IonButton>
//             <IonButton onClick={stopCamera}>Stop</IonButton>
//             <PictureSwiper />
//         </>
//     )
// }

// export default ExteriorCamera