import Page from '../../components/page/Page';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonGrid, IonCol, IonRow } from '@ionic/react';
import { TwoFaSelector } from '../../packages/TwoFA';
import './twoFAPage.scss';

const TwoFAPage = () => {
    return (
        <Page>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" >
                        <IonBackButton defaultHref="/login" icon="assets/svgs/previous.svg"/>
                    </IonButtons>
                    <IonTitle class="page-title">Two-Factor Authentication</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid className="content-in-center">
                    <IonRow>
                        <IonCol size='12' class="ion-text-center">
                            <span className='title'>Choose your security method</span>
                        </IonCol>
                        <IonCol size='12'>
                            <p>Choose the way you want to get the security code when we need to confirm that it’s you logging in.</p>
                        </IonCol>
                        <IonCol size='12'>
                            <TwoFaSelector></TwoFaSelector>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </Page>
    )
}

export default TwoFAPage;