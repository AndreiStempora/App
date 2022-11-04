import { Page } from '../../components/page/Page';
import { IonButtons, IonBackButton, IonTitle } from '@ionic/react';
import { TwoFaCode, TwoFA } from './TwoFA';
import { useAtom } from 'jotai';
import { CustomHeader, CustomContent } from '../../components/page/Page';
import "./twoFACodePage.scss";

const TwoFACodePage = () => {
    const [selectedOption] = useAtom(TwoFA.selectedOption);
    return (
        <Page pageClass={'twoFaCode'}>
            <CustomHeader>
                <IonButtons slot="start" >
                    <IonBackButton defaultHref="/login" icon="assets/svgs/previous.svg" />
                </IonButtons>
                <IonTitle class="ion-text-center page-title">{selectedOption?.widget}</IonTitle>
            </CustomHeader>
            <CustomContent
                gridClassStr={"content-in-center"}
                colSizesArr={[[12]]}
            >
                <TwoFaCode></TwoFaCode>
            </CustomContent>
        </Page>
    )
}

export default TwoFACodePage