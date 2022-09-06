import { IonPage, useIonViewWillEnter, useIonViewWillLeave, useIonViewDidEnter } from "@ionic/react";
import { ErrorComponent } from "../../packages/errors";
import { PageLoaderComponent } from '../../packages/loaders';
import { NetworkConnectionComponent } from "../../packages/network/index";
import './page.scss';

const Page = ({ children, pageClass }) => {
	useIonViewDidEnter(() => {
		try{
			document.querySelector(`.${pageClass}`).classList.add('show-page');
		}
		catch(e){
		}
	})
	useIonViewWillLeave(() => {
		try{
			document.querySelector(`.${pageClass}`).classList.remove('show-page');
		}
		catch(e){;
		}
	})

	
	return (
		<>
            <PageLoaderComponent />
		<IonPage className={`${pageClass} app-page`}>
			<NetworkConnectionComponent />
					{children}
            <ErrorComponent />
		</IonPage>
		</>
	)
}

export default Page;