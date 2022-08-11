import { IonPage } from "@ionic/react";
import { ErrorComponent } from "../../packages/errors";
import { ContentVisibility, PageLoaderComponent } from '../../packages/loaders';
import { NetworkConnectionComponent } from "../../packages/network/index";
import './page.scss';

const Page = ({ children, pageClass }) => {
	return (
		<IonPage className={pageClass}>
			<NetworkConnectionComponent />
            <PageLoaderComponent />
				<ContentVisibility>
					{children}
				</ContentVisibility>
            <ErrorComponent />
		</IonPage>
	)
}

export default Page;