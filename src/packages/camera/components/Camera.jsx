import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router';
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

export default CameraButton;