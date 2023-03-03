import { Page } from '../../../components/page/Page';
import { IonButtons, IonTitle } from '@ionic/react';
import { TwoFaCode, TwoFA } from '../TwoFA';
import { useAtom } from 'jotai';
import { CustomHeader, CustomContent } from '../../../components/page/Page';
import CustomBackButton from '../../../components/buttons/CustomBackButton';
import { useLanguage } from '../../../packages/multiLanguage';
import "./twoFACodePage.scss";

const TwoFACodePage = () => {
    const [selectedOption] = useAtom(TwoFA.selectedOption);
    const [translate] = useLanguage();

    return (
        <Page pageClass={'twoFaCode'}>
            <CustomHeader>
                <IonButtons slot="start" >
                    <CustomBackButton href="/login"></CustomBackButton>
                </IonButtons>
                <IonTitle class="ion-text-center page-title">{translate(selectedOption?.widget)}</IonTitle>
            </CustomHeader>
            <CustomContent
                gridClassStr={"content-in-center"}
            >
                <TwoFaCode />
            </CustomContent>
        </Page>
    )
}

export default TwoFACodePage