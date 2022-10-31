import {IonGrid, IonLabel, IonRow, IonCol, IonContent, IonHeader, IonToolbar, IonSearchbar, IonTitle, IonButtons, IonButton, IonIcon, IonBackButton } from '@ionic/react';
import { Page, CustomHeader, CustomContent } from '../../../components/page/Page';
import { useAtom } from 'jotai';
import { user } from '../../../services/user/user';
import { VehicleSearch } from '../../../packages/database';
import { CameraButton } from '../../../packages/camera';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import FooterAddVehicle from '../../../components/footers/FooterAddVehicle';
import './vehiclePage.scss';
import AdedVehiclesSearch from '../../../components/vehicleComponents/adedVehicleSearch/AdedVehiclesSearch';
import FooterDeleteUpload from '../../../components/footers/FooterDeleteUpload';


const VehiclePage = () => {
    
    const [userInfo]= useAtom(user.userDetails);
    const [searchText, setSearchText] = useState('');
    const [showCheckbox, setShowCheckbox] = useState(false);

    const editVehicleHandler = () => {
        setShowCheckbox(!showCheckbox);
    }
    

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
                    <IonButton onClick={editVehicleHandler}>
                        {showCheckbox? <IonIcon icon='/assets/svgs/SelectAll.svg'/> : <IonIcon icon='/assets/svgs/edit1.svg'></IonIcon>}
                        
                    </IonButton>
                </IonButtons>
            </CustomHeader>

            <CustomContent colSizesArr={[12]}>
                <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.target.value)} setClearButton="focus"></IonSearchbar>
                <AdedVehiclesSearch showCheckbox={showCheckbox}></AdedVehiclesSearch>
            </CustomContent>
            {showCheckbox?<FooterDeleteUpload/> : <FooterAddVehicle></FooterAddVehicle>}
            {/* <FooterAddVehicle/> */}
        </Page>

    )
}

export default VehiclePage;