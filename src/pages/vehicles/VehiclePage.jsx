import {IonGrid, IonLabel, IonRow, IonCol, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonBackButton } from '@ionic/react';
import Page from '../../components/page/Page';
import { useAtom } from 'jotai';
import { user } from '../../services/user/user';
import { VehicleSearch } from '../../packages/database';
import { CameraButton } from '../../packages/camera';
import { useEffect, useState } from 'react';
import CustomHeader from '../../components/pageMainComponents/CustomHeader';
import CustomContent from '../../components/pageMainComponents/CustomContent';
import './vehiclePage.scss';

const VehiclePage = () => {
    const [userInfo]= useAtom(user.userDetails);

    useEffect(() => {
    }, []);
    
    return (
        <Page pageClass={'vehiclesSearch'}>
            <CustomHeader>
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
            </CustomHeader>

            {/* <CustomContent> */}
                <VehicleSearch></VehicleSearch> 
            {/* </CustomContent> */}
            {/* <CameraButton/> */}
        </Page>

    )
}

export default VehiclePage;