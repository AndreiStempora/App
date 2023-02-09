import { Page } from '../../../components/page/Page';
import { IonButtons, IonTitle } from '@ionic/react';
import { TwoFaCode, TwoFA } from '../TwoFA';
import { useAtom } from 'jotai';
import { CustomHeader, CustomContent } from '../../../components/page/Page';
import CustomBackButton from '../../../components/buttons/CustomBackButton';
import "./twoFACodePage.scss";

const TwoFACodePage = () => {
    const [selectedOption] = useAtom(TwoFA.selectedOption);

    return (
        <Page pageClass={'twoFaCode'}>
            <CustomHeader>
                <IonButtons slot="start" >
                    <CustomBackButton href="/login"></CustomBackButton>
                </IonButtons>
                <IonTitle class="ion-text-center page-title">{selectedOption?.widget}</IonTitle>
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