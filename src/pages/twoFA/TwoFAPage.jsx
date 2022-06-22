import Page from '../../components/page/Page';
import usePageRequest from "../../services/customHooks/pageRequestHook";
import usePageSetters from '../../services/customHooks/pageRequestSettersHook';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { URL } from '../../services/Requests/importantUrls';
import { user } from "../../services/user/user";
import { IonContent, IonHeader, IonToolbar,IonButtons,IonBackButton } from '@ionic/react';
import { CustomForm, formAtoms } from '../../packages/form';
import { TwoFaElements, TwoFaSelectorPage } from '../../packages/TwoFA';

const TwoFAPage = () => {
    return (
        <Page>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" >
                        <IonBackButton defaultHref="/login" text="beck" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <h1>2 FA</h1>
            <IonContent>
                {/* <TwoFaElement services={severalServices}></TwoFaElement> */}
                <TwoFaSelectorPage></TwoFaSelectorPage>
            </IonContent>

        </Page>
    )
}

export default TwoFAPage