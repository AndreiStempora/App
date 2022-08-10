import Page from '../../components/page/Page';
// import usePageRequest from "../../services/customHooks/pageRequestHook";
// import usePageSetters from '../../services/customHooks/pageRequestSettersHook';
// import { URL } from '../../services/Requests/importantUrls';
import { URL, usePageRequest, usePageSetters } from "../../services"
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { IonGrid, IonRow, IonCol, IonIcon, IonContent } from '@ionic/react';
import { CustomForm, formAtoms } from '../../packages/form';
import "./loginPage.scss";

const LoginPage = () => {
    const pageRequest = usePageRequest();
    const requestSetters = usePageSetters();
    const [logInUrl] = useAtom(URL.login);
    const [summary] = useAtom(URL.dealership);
    const [, setLogInFields] = useAtom(formAtoms.logInFormSetter);
    const [logInFields] = useAtom(formAtoms.logInForm);

    const getFieldsRequest = async () => {
        requestSetters.setToken("");                   //if you are here you should never have token
        requestSetters.isLoggedIn(false);
        requestSetters.setUserDetails("");
        requestSetters.setUrl(logInUrl);
        await requestSetters.fetch();
        setLogInFields();
    };

    useEffect(() => {
        pageRequest.requestFunction(getFieldsRequest);
    }, []);

    const submitLogin = async (e) => {
        e.preventDefault();

        requestSetters.setUrl(logInFields.url);            //request url
        requestSetters.setRequestBody();                   //add form fields to request

        let response = await requestSetters.fetch();       //make request
        requestSetters.setToken(response?.token);
        requestSetters.setUserDetails(response?.profile);     
        requestSetters.setFormData('RESET');                //reset body

        if (response.status === "error") {                  //if error
            requestSetters.setError(response.message);      //show error message
            return;                                         //exit
        }

        requestSetters.setRequestBody();                   //add token to body 
        requestSetters.setUrl(summary);                    //set new URL
        response = await requestSetters.fetch();           //make request

        if (response?.status === "ok") {
            requestSetters.isLoggedIn(true);
            requestSetters.setUserDetails(response.profile);
            requestSetters.push('/dealerships')
        } else {
            if (response?.module === "users-addon-2fa") {
                requestSetters.push("/2fa");
            }
        }
    }

    return (
        <Page pageClass={'loginPage'}>
            <IonContent>
                <IonGrid className="content-in-center vertical-centering">
                    <IonRow >
                        <IonCol size='12' class="ion-text-center">
                            <IonIcon
                                className="logo"
                                icon="assets/svgs/logo.svg"
                            ></IonIcon>
                        </IonCol>
                        <IonCol size='12' class="ion-text-center">
                            <CustomForm submitForm={submitLogin} autofocus={true} />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </Page>
    )
}

export default LoginPage;