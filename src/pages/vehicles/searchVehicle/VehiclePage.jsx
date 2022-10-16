import {IonGrid, IonLabel, IonRow, IonCol, IonContent, IonHeader, IonToolbar, IonSearchbar, IonTitle, IonButtons, IonButton, IonIcon, IonBackButton } from '@ionic/react';
import { Page, CustomHeader, CustomContent, CustomFooter } from '../../../components/page/Page';
import { useAtom } from 'jotai';
import { user } from '../../../services/user/user';
import { VehicleSearch } from '../../../packages/database';
import { CameraButton } from '../../../packages/camera';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './vehiclePage.scss';


const VehiclePage = () => {
    const history = useHistory();
    const [userInfo]= useAtom(user.userDetails);
    const [searchText, setSearchText] = useState('');

    const addVehicleHandler = () => {
        history.push("/add-vehicle");
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
                    <IonButton>
                        <IonIcon icon='/assets/svgs/edit1.svg'></IonIcon>
                    </IonButton>
                </IonButtons>
            </CustomHeader>

            <CustomContent colSizesArr={[12]}>
                <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.target.value)} setClearButton="focus"></IonSearchbar>
                {/* <IonButton></IonButton> */}
            </CustomContent>
            {/* <VehicleSearch></VehicleSearch>  */}
            {/* <CameraButton/> */}
            <CustomFooter>
                <IonButtons>
                    <IonButton onClick={addVehicleHandler} className='icon-over-text'>
                        <div className="container">
                            <IonIcon icon='/assets/svgs/add.svg'></IonIcon>
                            <IonLabel>Vehicle</IonLabel>
                        </div>
                    </IonButton>
                    <IonButton className='icon-over-text' href="/dealerships">
                        <div className="container">
                            <IonIcon icon='/assets/svgs/car.svg'></IonIcon>
                            <IonLabel>Dealerships</IonLabel>
                        </div>
                    </IonButton>
                    <IonButton className='icon-over-text'>
                        <div className="container">
                            <IonIcon icon='/assets/svgs/user.svg'/>
                            <IonLabel>Profile</IonLabel>
                        </div>
                    </IonButton>
                </IonButtons>
            </CustomFooter>
        </Page>

    )
}

export default VehiclePage;