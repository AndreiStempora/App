import { IonPage, IonContent } from "@ionic/react";
import { ErrorComponent } from "../../packages/errors";
import { PageLoaderComponent } from '../../packages/loaders';
import { NetworkConnectionComponent } from "../../packages/network/index";
import './page.scss';

const Page = ({ children }) => {
	return (
		<IonPage>
			<NetworkConnectionComponent />
            <PageLoaderComponent />
				{children}
            <ErrorComponent />
		</IonPage>
	)
}

export default Page;