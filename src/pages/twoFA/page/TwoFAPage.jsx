import { Page } from '../../../components/page/Page';
import { IonButtons, IonTitle } from '@ionic/react';
import { TwoFaSelector } from '../TwoFA';
import { CustomHeader, CustomContent } from '../../../components/page/Page';
import CustomBackButton from '../../../components/buttons/CustomBackButton';
import './twoFAPage.scss';
import { useLanguage } from '../../../packages/multiLanguage';

const TwoFAPage = () => {
    const [translate] = useLanguage();

    return (
        <Page pageClass={'twoFaSelect'}>
            <CustomHeader>
                <IonButtons slot="start" >
                    <CustomBackButton href='/login' />
                </IonButtons>
                <IonTitle class="ion-text-center page-title">{translate("Two-Factor Authentication")}</IonTitle>
            </CustomHeader>
            <CustomContent
                gridClassStr={"content-in-center"}
                colSizesArr={[[12, "ion-text-center"], [12], [12]]}
            >
                <span className='title'>{translate("Choose your security method")}</span>
                <p>{translate("Choose the way you want to get the security code when we need to confirm that it’s you logging in.")}</p>
                <TwoFaSelector></TwoFaSelector>
            </CustomContent>
        </Page>
    )
}

export default TwoFAPage;