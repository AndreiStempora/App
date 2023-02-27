import { IonGrid, IonLabel, IonRow, IonCol, IonContent, IonHeader, IonToolbar, IonSearchbar, IonTitle, IonButtons, IonButton, IonIcon, IonBackButton } from '@ionic/react';
import { useHistory } from 'react-router';
import { CustomFooter } from '../../Page';
import { useEffect, useState } from 'react';
import { dealershipsService, useDbRequest } from '../../../../packages/database';
import "./footerAddVehicle.scss";

const FooterAddVehicle = ({ photoBtn }) => {
    const dbRequest = useDbRequest();
    const history = useHistory();
    const [showDealershipBtn, setShowDealershipBtn] = useState(false);

    useEffect(() => {
        (async () => {
            const dealerships = await dbRequest.requestFunction(async () => await dealershipsService.getAllDealerships());
            if (dealerships.length > 1) {
                setShowDealershipBtn(true);
            } else {
                setShowDealershipBtn(false);
            }
        })();
    }, []);

    const addVehicleHandler = () => {
        history.push("/add-vehicle");
    }
    const takePhotoHandler = () => {
        console.log('take photo');
    }

    const toDealershipsHandler = () => {
        history.push("/dealerships");
    }

    const goToProfileHandler = () => {
        history.push("/profile");
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
                            <IonLabel>Vehicle</IonLabel>
                        </div>
                    </IonButton>
                }

                <IonButton onClick={toDealershipsHandler} className={`icon-over-text ${showDealershipBtn ? "dealerships-btn" : "vehicles-btn"}`} href="/dealerships">
                    <div className="container">
                        <IonIcon icon='/assets/svgs/car.svg'></IonIcon>
                        <IonLabel>{showDealershipBtn ? "Dealerships" : "Vehicles"}</IonLabel>
                    </div>
                </IonButton>

                <IonButton onClick={goToProfileHandler} className='icon-over-text'>
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
