import { IonPage, IonItem, IonList, IonCheckbox, IonHeader, IonLabel, IonContent, IonButton, IonFab, IonFabButton, IonIcon, IonItemSliding, IonSegment, IonSegmentButton } from '@ionic/react';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { useEffect, useState } from 'react';
import { useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';
// import { CameraPreview } from '@capacitor-community/camera-preview';
import { FS } from '../../packages/filesystem';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import Page from '../../components/page/Page';


import './cameraPage.scss';

const CameraPage = () => {
    const [cameraOn, setCameraOn] = useState(false);
    const [src,setSrc] = useState(null);
    const [pic,setPic] = useState(null);

    const cameraPreviewOptions = {
        // position: 'rear',
        toBack: true,
        

        // parent: 'cameraPreview',
        // className: 'cameraPreview',
        // width: window.innerWidth,
        // height: window.innerHeight,
        // width: 300,
        // height: 300,
        // x: 0,
        // y: 0,
        // tapPhoto: true,
        // tapFocus: true,
        // previewDrag: true,
        storeToFile: true,
    };

    useIonViewDidEnter(async () => {
        await CameraPreview.start(cameraPreviewOptions);
        console.log('Camera started');
    });

    useIonViewWillLeave(async () => {
        await CameraPreview.stop();   
        console.log('Camera stopped');
    });

    useEffect(() => {
        (async()=>{
            // await Filesystem.mkdir({path: 'photos', directory: Directory.Data, recursive: true});
            // let x = await Filesystem.getUri({directory: Directory.Data, path: 'photos'});
            // console.log(x);
            // setSrc(x.uri);
            // await Filesystem.readdir({path: 'photos', directory: Directory.Data});
            // let x = await CameraPreview.get();
            // console.log(x)
            // await Filesystem.readFileResult({path: 'file:///data/user/0/io.ionic.starter/files/photos/alfa2.jpg'});

        })()
    },[])

    // useEffect(() => {
    //     (async() => {
    //         try{
    //             if(!cameraOn){
                    
    //                 setCameraOn(true);
    //             }
    //         } catch (e) {
    //             console.log(e);
    //         }  
    //     })()
    // }, []);

    
    const takePicture = async () => {
        const result = await CameraPreview.capture({quality:100});
        console.log(result.value);
        // setPic("data:image/jpg;base64"+base64PictureData);
        // let result = await CameraPreview.capture({ quality: 100 });
        let res = 'file://' + result.value;
        let x = (await Filesystem.getUri({directory: Directory.Data, path: 'photos'})).uri
        // console.log(x,res);
        let newUri = (await Filesystem.copy({from:res,to:x+`/${(new Date()).getTime()}.jpg`})).uri;
        console.log(newUri);
        // let x = await Filesystem.readFile({path: newUri, directory: Directory.Data, encoding: Encoding.UTF8});
        var request = new XMLHttpRequest();
        request.open('GET', newUri, true);
        request.responseType = 'blob';
        request.onload = function() {
            var reader = new FileReader();
            reader.readAsDataURL(request.response);
            reader.onload =  function(e){
                console.log('DataURL:', e.target.result);
            };
        };
        request.send();
        // console.log(res);
        // let a = await Filesystem.copy({from:res,to:src+'/alfa2.jpg'});
        // setPic(result.value);
        // console.log(a.uri);

        
        // console.log(window.location)
        // console.log(result);
        // let base64Image = 'data:image/jpeg;base64,' + result.value;
        // turn result into a blob
        // const contentType = 'image/jpg';

        // const blob = new Blob([base64Image], { type: contentType });
        // console.log(blob, 'blob');
        // const blobUrl = URL.createObjectURL(blob);
        // console.log(blobUrl, 'blobUrl');
        // setSrc(blobUrl);
        // const file = new File([blob], 'test.jpg', { type: "application/octet-stream" });
        // console.log(file, 'file');
        // file.toDataURL('image/jpeg', 1.0).then((dataUrl) => {setSrc(dataUrl)});
        

        // try {
            // let x = await CameraPreview.takePicture({ quality:100 });
            // let y = "file://" +x[0];

            // // const blob = await y.blob();
            // // console.log(blob, "blob");
            // const reader = new FileReader();
            // reader.readAsDataURL(y);
            // let r = new Promise(resolve => {
            //     reader.onloadend = () => {
            //         resolve(reader.result);
            //     };
            // });

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
                <img src={pic}/>
            </IonContent>
        </Page>
    )
}

export default CameraPage