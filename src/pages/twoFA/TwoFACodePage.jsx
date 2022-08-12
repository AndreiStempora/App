import Page from '../../components/page/Page';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonGrid, IonTitle, IonCol, IonRow } from '@ionic/react';
import { TwoFaCode,TwoFA } from '../../packages/TwoFA';
import { useAtom } from 'jotai';
import "./twoFACodePage.scss";

const TwoFACodePage = () => {
    const [selectedOption] = useAtom(TwoFA.selectedOption);
    return (
        <Page pageClass={'twoFaCode'}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" >
                        <IonBackButton defaultHref="/login" icon="assets/svgs/previous.svg" />
                    </IonButtons>
                    <IonTitle class="ion-text-center page-title">{selectedOption?.widget}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid className="content-in-center">
                    <IonRow>
                        <IonCol size='12'>
                            <TwoFaCode></TwoFaCode>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </Page>
    )
}

export default TwoFACodePage