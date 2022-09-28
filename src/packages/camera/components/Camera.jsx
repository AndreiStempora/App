import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import './camera.scss';

const CameraButton = () => {
    const history = useHistory();
    const openCamera = async () => {
        history.push('/camera');
    }

    return (
        <IonFab onClick={openCamera} slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton color="danger">
                <IonIcon icon='assets/svgs/camera.svg'></IonIcon>
            </IonFabButton>
        </IonFab>
    )
}

const Camera = () => {
    const [cameraOn, setCameraOn] = useState(false);
    const cameraPreviewOptions = {
        toBack: true,
        quality: 100,
        storeToFile: true,
    };

    


    useEffect(() => {
        (async () => {
            
            if (!cameraOn) {
                await CameraPreview.start(cameraPreviewOptions);
                console.log('camera started');
                setCameraOn(true);
            }
        })()

        return async () => {
            if (cameraOn) {
                CameraPreview.stop();
                console.log('camera stopped');
                setCameraOn(false);
            }
        }
    }, [])

    return (
        <div className="camera"></div>
    )
}

export  { CameraButton, Camera };