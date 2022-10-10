import { IonPage, IonItem, IonList, IonCheckbox, IonHeader, IonFooter, IonLabel, IonContent, IonButton, IonFab, IonFabButton, IonIcon, IonItemSliding, IonSegment, IonSegmentButton } from '@ionic/react';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { useEffect, useState } from 'react';
import { FS } from '../../packages/filesystem';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Page } from '../../components/page/Page';
import { CameraControls, Camera } from '../../packages/camera';


import './cameraPage.scss';

const CameraPage = () => {
    const [cameraOn, setCameraOn] = useState(false);
    const [pic,setPic] = useState(null);
    const [filesUrl, setFilesUrl] = useState(null);

    useEffect(() => {
        (async()=>{
            await FS.createDirectory('images');
            await FS.readDirectory('images');
            const url = await Filesystem.getUri({path:'images',directory:Directory.Data});
            setFilesUrl(url.uri);
        })()
    },[])

    return (
        <Page pageClass={"cameraPage"}>
            <IonHeader>
                <div>CameraPage</div>
            </IonHeader>
            <IonContent>
                {/* <ExteriorCamera filesPath={filesUrl} /> */}
                <Camera/>
            </IonContent>
            <IonFooter>
                <CameraControls filesPath={filesUrl} />
            </IonFooter>
        </Page>
    )
}

export default CameraPage