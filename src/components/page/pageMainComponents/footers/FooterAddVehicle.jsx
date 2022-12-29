import { IonGrid, IonLabel, IonRow, IonCol, IonContent, IonHeader, IonToolbar, IonSearchbar, IonTitle, IonButtons, IonButton, IonIcon, IonBackButton } from '@ionic/react';
import { useHistory } from 'react-router';
import { CustomFooter } from '../../Page';

const FooterAddVehicle = ({ photoBtn }) => {
    const history = useHistory();

    const addVehicleHandler = () => {
        history.push("/add-vehicle");
        // history.push({ pathname: `${history.location.pathname}/add-vehicle` });
        // console.log(history.location.pathname);

    }
    const takePhotoHandler = () => {
        console.log('take photo');
    }
    const toDealershipsHandler = () => {
        history.push("/dealerships");
        // history.push({ pathname: `${history.location.pathname}` });
    }
    return (
        <CustomFooter>
            <IonButtons>
                {photoBtn ?
                    <IonButton onClick={takePhotoHandler} className='icon-over-text'>
                        <div className="container">
                            <IonIcon icon='/assets/svgs/add.svg'></IonIcon>
                            <IonLabel>Photo</IonLabel>
                        </div>
                    </IonButton> :
                    <IonButton onClick={addVehicleHandler} className='icon-over-text'>
                        <div className="container">
                            <IonIcon icon='/assets/svgs/add.svg'></IonIcon>
                            <IonLabel>Add Vehicle</IonLabel>
                        </div>
                    </IonButton>
                }
                <IonButton onClick={toDealershipsHandler} className='icon-over-text' href="/dealerships">
                    <div className="container">
                        <IonIcon icon='/assets/svgs/car.svg'></IonIcon>
                        <IonLabel>Dealerships</IonLabel>
                    </div>
                </IonButton>
                <IonButton className='icon-over-text'>
                    <div className="container">
                        <IonIcon icon='/assets/svgs/user.svg' />
                        <IonLabel>Profile</IonLabel>
                    </div>
                </IonButton>
            </IonButtons>
        </CustomFooter>
    )
}

export default FooterAddVehicle
