import { Page } from '../../components/page/Page';
import { IonButtons, IonBackButton, IonTitle } from '@ionic/react';
import { TwoFaSelector } from './TwoFA';
import { CustomHeader, CustomContent } from '../../components/page/Page';
import './twoFAPage.scss';

const TwoFAPage = () => {
    return (
        <Page pageClass={'twoFaSelect'}>
            <CustomHeader>
                <IonButtons slot="start" >
                    <IonBackButton defaultHref="/login" icon="assets/svgs/previous.svg" />
                </IonButtons>
                <IonTitle class="ion-text-center page-title">Two-Factor Authentication</IonTitle>
            </CustomHeader>
            <CustomContent
                gridClassStr={"content-in-center"}
                colSizesArr={[[12, "ion-text-center"], [12], [12]]}
            >
                <span className='title'>Choose your security method</span>
                <p>Choose the way you want to get the security code when we need to confirm that it’s you logging in.</p>
                <TwoFaSelector></TwoFaSelector>
            </CustomContent>
        </Page>
    )
}

export default TwoFAPage;