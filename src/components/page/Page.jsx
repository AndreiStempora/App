import { IonPage } from "@ionic/react";
import { ErrorComponent } from "../../packages/errors";
import { PageLoaderComponent } from '../../packages/loaders';
import { NetworkConnectionComponent } from "../../packages/network/index";
import './page.scss';

const Page = ({ children, pageClass }) => {
	return (
		<IonPage className={pageClass}>
			<NetworkConnectionComponent />
            <PageLoaderComponent />
				{children}
            <ErrorComponent />
		</IonPage>
	)
}

export default Page;