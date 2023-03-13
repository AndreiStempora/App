import { Page, CustomContent, CustomHeader } from '../../../components/page/Page';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../../packages/multiLanguage';
import { useHistory } from 'react-router';
import { IonTitle } from '@ionic/react';
import DealershipSelector from '../components/DealershipSelector';
import useRefreshCurrentPage from "../../../services/customHooks/RefreshCurrentPage";
import useHandleDealershipsPage from "../features/handleDealershipsPage";
const DealershipsPage = () => {
	const [translate] = useLanguage();
	const {refreshPage} = useRefreshCurrentPage();
	const history = useHistory();
	const [dealerships, setDealerships] = useState();
	const handleDealershipsPage = useHandleDealershipsPage();

	useEffect(() => {
		refreshPage(history,'/dealerships',(async () => {
			setDealerships(await handleDealershipsPage());
			console.log(history)
		}))
	}, [history.location.pathname]);

	return (
		<Page pageClass={'dealerships-selector'}>
			<CustomHeader>
				<IonTitle className='ion-text-center'>{translate('Dealerships')}</IonTitle>
			</CustomHeader>
			<CustomContent
				gridClassStr={"content-in-center vertical-centering"}
				colClassStr={[[12], [12]]}
			>
				<DealershipSelector dealerships={dealerships}></DealershipSelector>
			</CustomContent>
		</Page>
	)
}

export default DealershipsPage



