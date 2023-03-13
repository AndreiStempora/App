import { CustomContent, Page } from '../../../components/page/Page';
import { URL, usePageRequest, usePageSetters } from "../../../services"
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { CustomForm, formAtoms } from '../components/form';
import { LanguageSelector } from '../../../packages/multiLanguage';
import { useHistory} from "react-router";
import "./loginPage.scss";

const LoginPage = () => {
    const history = useHistory();
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
        const response2 = await requestSetters.fetch();           //make request

        if (response2?.status === "ok") {
            requestSetters.isLoggedIn(true);
            requestSetters.setUserDetails(response.profile);
            history.push('/dealerships')
        } else {
            if (response2?.module === "users-addon-2fa") {
                history.push("/2fa");
            }
        }
    }

    return (
        <Page pageClass={'loginPage'}>
            <CustomContent
                gridClassStr={"content-in-center vertical-centering"}
                colSizesArr={[[12, "ion-text-center"], [12, "ion-text-center"]]}
            >
                <IonIcon
                    className="logo"
                    icon="assets/svgs/logo.svg"
                ></IonIcon>

                <CustomForm
                    submitForm={submitLogin}
                    autofocus={true}
                />
            </CustomContent>
            <LanguageSelector />
        </Page>
    )
}

export default LoginPage;