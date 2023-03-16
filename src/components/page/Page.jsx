import { IonPage, useIonViewWillEnter, useIonViewWillLeave, useIonViewDidEnter } from "@ionic/react";
import { NetworkConnectionComponent } from "../../packages/network/index";
import { PageLoaderComponent } from '../../packages/loaders';
import { ErrorComponent } from "../../packages/errors";
import CustomContent from "./pageMainComponents/CustomContent";
import CustomFooter from "./pageMainComponents/CustomFooter";
import CustomHeader from "./pageMainComponents/CustomHeader";
import './page.scss';

const Page = ({ children, pageClass }) => {
	useIonViewDidEnter(() => {
		try {
			document.querySelector(`.${pageClass}`).classList.add('show-page');
		}
		catch (e) {
		}
	})
	useIonViewWillLeave(() => {
		try {
			document.querySelector(`.${pageClass}`).classList.remove('show-page');
		}
		catch (e) {
			;
		}
	})


	return (
		<>
			<PageLoaderComponent />
			<NetworkConnectionComponent />
			<IonPage className={`${pageClass} app-page`}>
				{children}
				<ErrorComponent />
			</IonPage>
		</>
	)
}

export { Page, CustomHeader, CustomContent, CustomFooter };