import Page from '../../components/page/Page';
import { IonContent, IonHeader, IonToolbar,IonButtons,IonBackButton } from '@ionic/react';
import { TwoFaCode } from '../../packages/TwoFA';

const TwoFACodePage = () => {
    return (
        <Page>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" >
                        <IonBackButton defaultHref="/login" text="beck" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <h1>2 FA code</h1>
            <IonContent>
                <TwoFaCode></TwoFaCode>
            </IonContent>
        </Page>
    )
}

export default TwoFACodePage