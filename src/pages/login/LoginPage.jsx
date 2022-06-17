import Page from '../../components/page/Page';
import usePageRequest from "../../services/customHooks/pageRequestHook";
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { URL } from '../../services/Requests/importantUrls';
import { request } from "../../services/Requests/request";
import { reqBody } from "../../services/Requests/requestBody";
import { user } from "../../services/user/user";
import { IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { CustomForm, formAtoms } from '../../packages/form';
import { error } from '../../packages/errors';
import "./loginPage.scss";

const LoginPage = () => {
	const pageRequest           = usePageRequest();
	const [logInUrl]            = useAtom(URL.login);
    const [summary]             = useAtom(URL.dealership);
	const [,setToken]           = useAtom(user.tokenAtom);
	const [,setLoggedIn]        = useAtom(user.loggedIn);
	const [,setUrl]             = useAtom(request.URLAtom);
	const [,fetch]              = useAtom(request.requestAtom);
    const [,setLogInFields]     = useAtom(formAtoms.logInFormSetter);
    const [logInFields]         = useAtom(formAtoms.logInForm);
    const [,setFormData]        = useAtom(formAtoms.formDataAtom);
    const [,setRequestBody]     = useAtom(reqBody.requestBodyAtom);
    const [,setError]           = useAtom(error.errorAtom);

	const getFieldsRequest = async()=>{
        setToken("");                   //if you are here you should never have token
        setLoggedIn(false);
        setUrl(logInUrl);
        await fetch();
        setLogInFields();
    };

	useEffect(()=>{
        pageRequest.requestFunction(getFieldsRequest);
    },[]);


    const submitLogin = async (e)=>{
        e.preventDefault();

        setUrl(logInFields.url);            //request url
        setRequestBody();                   //add form fields to request

        let response = await fetch();       //make request
        setFormData('RESET')                //reset body
                                            
        if(response.status === "error"){    //if error
            setError(response.message);     //show error message
            return;                         //exit
        }

        setRequestBody();                   //add token to body 
        setUrl(summary);                    //set new URL
        response = await fetch();           //make request
        console.log(response,"rrr");
        // if(response.status === "ok"){
        //     getExists();
        //     console.log("step3")
        //     console.warn(exists)
        //     if(exists){
        //         getMultipleServices();
        //         console.log(multipleServices,"MP")
        //         history.push(multipleServices)
        //     } else {
        //         history.push("/start");
        //     }
        // }
        // if(response?.module === "users-addon-2fa"){
        //      history.push("/2FA")
        // }
        //     setUrl(response?.call);
        //     setRequestBody();
        //     response = await fetch();
        //     setTwoFA(response?.services);
        //     if(response?.services?.length > 1){
        //         // console.log(response.services.length,"rrr")
        //         history.push("/2FA")
                
        //     } else {
        //         setSelectedTwoFAOption(response?.services);
        //         // history.push("/2FA/service")
                
        //     }
        // } else {
        //     history.push("/start")
        // }
        // console.log(response,"lLLllLLlLLlLLLllL");
    
    }

	return (
		<Page>
            <IonGrid className="ion-align-self-center full-height">
                <IonRow >
                    <IonCol class="ion-text-center">
                        <IonIcon
                            className="logo"
                            icon="/assets/svgs/splash.svg"
                            ></IonIcon>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol class="ion-text-center">
                        <CustomForm  submitForm={submitLogin} autofocus={true}/>
                    </IonCol>
                </IonRow>
            </IonGrid>
		</Page>
	)
}

export default LoginPage;