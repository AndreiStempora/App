import { IonPage, useIonViewWillEnter, useIonViewWillLeave, useIonViewDidEnter } from "@ionic/react";
import { ErrorComponent } from "../../packages/errors";
import { PageLoaderComponent } from '../../packages/loaders';
import { NetworkConnectionComponent } from "../../packages/network/index";
import './page.scss';

const Page = ({ children, pageClass }) => {

	useIonViewDidEnter(() => {
		setTimeout(() => {
			document.querySelector(`.${pageClass}`).classList.add('show-page');
		} , 100);
	})
	useIonViewWillLeave(() => {
		document.querySelector(`.${pageClass}`).classList.remove('show-page');
	})
	return (
		<IonPage className={`${pageClass} app-page`}>
			<NetworkConnectionComponent />
            <PageLoaderComponent />
					{children}
            <ErrorComponent />
		</IonPage>
	)
}

export default Page;