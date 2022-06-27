import Page from '../../components/page/Page';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonGrid, IonTitle } from '@ionic/react';
import { TwoFaCode } from '../../packages/TwoFA';
import "./twoFACodePage.scss";

const TwoFACodePage = () => {
    return (
        <Page>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" >
                        <IonBackButton defaultHref="/login" text="" icon="assets/svgs/previous.svg" />
                    </IonButtons>
                    <IonTitle class="ion-text-center">Header</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid className="ion-align-self-center full-height">
                    <TwoFaCode></TwoFaCode>
                </IonGrid>
            </IonContent>
        </Page>
    )
}

export default TwoFACodePage