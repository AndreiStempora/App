import { IonLoading } from '@ionic/react';
import { useAtom } from 'jotai';
import { loader } from '../features/loader';
import "./pageLoaderComponent.scss";

const PageLoaderComponent = () => {
	const [loading] = useAtom(loader.showLoaderAtom)
	
	return (
		<IonLoading
			cssClass={"darken"}
			isOpen={loading}
			message="Please wait..."
			spinner="lines-sharp-small"
			show-backdrop="false"
			
		></IonLoading>
	)
}

export default PageLoaderComponent