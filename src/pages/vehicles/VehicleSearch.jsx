import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonBackButton } from '@ionic/react';
import Page from '../../components/page/Page';
import { useAtom } from 'jotai';
import { user } from '../../services/user/user';
import './vehicleSearch.scss';

const VehicleSearch = () => {
    const [userInfo]= useAtom(user.userDetails);
    console.log(userInfo);

    
    return (
        <Page pageClass={'vehiclesSearch'}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" >
                        <IonButton defaultHref="/profile" >
                            <IonIcon icon='/assets/svgs/user.svg'></IonIcon>
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
            <IonContent></IonContent>
        </Page>
    )
}

export default VehicleSearch