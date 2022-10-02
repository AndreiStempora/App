import {IonGrid, IonLabel, IonRow, IonCol, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonBackButton } from '@ionic/react';
import Page from '../../components/page/Page';
import { useAtom } from 'jotai';
import { user } from '../../services/user/user';
import { VehicleSearch } from '../../packages/database';
import { CameraButton } from '../../packages/camera';
import { useEffect, useState } from 'react';
import './vehicleSearchPage.scss';

const VehicleSearchPage = () => {
    const [userInfo]= useAtom(user.userDetails);

    useEffect(() => {
    }, []);
    
    return (
        <Page pageClass={'vehiclesSearch'}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" >
                        <IonButton defaultHref="/profile" >
                            {userInfo.avatar? <img src={userInfo.avatar} alt="avatar" /> : <IonIcon icon='/assets/svgs/user.svg'/>}
                            
                            </IonButton>
                    </IonButtons>
                    
					<IonTitle className='ion-text-center'>Vehicles</IonTitle>
                    <IonButtons slot="end" >
                        <IonButton>
                            <IonIcon icon='/assets/svgs/edit1.svg'></IonIcon>
                        </IonButton>
                    </IonButtons>
				</IonToolbar>
            </IonHeader>
            <VehicleSearch></VehicleSearch> 
            <CameraButton/>
        </Page>

    )
}

export default VehicleSearchPage;