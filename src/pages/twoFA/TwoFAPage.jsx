import Page from '../../components/page/Page';
import { IonContent, IonHeader, IonToolbar,IonButtons,IonBackButton } from '@ionic/react';
import { TwoFaSelector } from '../../packages/TwoFA';

const TwoFAPage = () => {
    return (
        <Page>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" >
                        <IonBackButton defaultHref="/login" text="" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <h1>2 FA</h1>
            <IonContent>
                <TwoFaSelector></TwoFaSelector>
            </IonContent>
        </Page>
    )
}

export default TwoFAPage;