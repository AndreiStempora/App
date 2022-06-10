import React from 'react';
import { IonPage, IonLoading } from "@ionic/react";
import { NetworkConnectionComponent } from "../../packages/network/index"
import { PageLoaderComponent } from '../../packages/loaders';

const Page = ({children}) => {

	return (
		<IonPage>
			<NetworkConnectionComponent />
            <PageLoaderComponent />
            {/* <IonLoading
                isOpen={spin}
                message="Please wait..."
            ></IonLoading> */}
			{children}
{/*             
            {props.children}
            <IonToast isOpen={toast} message={error} position="bottom"></IonToast>  */}
		</IonPage>
	)
}

export default Page