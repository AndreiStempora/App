import { Page, CustomContent, CustomHeader } from '../../../components/page/Page';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../../packages/multiLanguage';
import { useHistory } from 'react-router';
import { IonTitle } from '@ionic/react';
import {useDbRequest, DB} from "../../../packages/database";
import DealershipSelector from '../components/DealershipSelector';
import useGetDealerships from "../features/serverRequests";
import useUpdateDatabase from "../features/databaseBulkModifications";
import useRefreshCurrentPage from "../../../services/customHooks/RefreshCurrentPage";

const DealershipsPage = () => {
	const dbRequest = useDbRequest();
	const [translate, ] = useLanguage();
	// const getDealerships = useGetDealerships();
	const updateDatabase = useUpdateDatabase();
	// const [requestInfo, setRequestInfo] = useState({});
	const {refreshPage} = useRefreshCurrentPage();
	const history = useHistory();

	useEffect(() => {
		refreshPage(history,'/dealerships',(async () => {
			dbRequest.setLoading(true);
			try {

				await updateDatabase();


					// await dbRequest.requestFunction(() => DB.dropAllTables());
			//
			} catch (e) {
				console.log('error', e);
			}
			finally {
				dbRequest.setLoading(false);
			}
			// const requestInfo = await getDealerships();
			// setRequestInfo(requestInfo);
			// await updateDatabase(requestInfo);

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
				<></>
				{/*<DealershipSelector info={requestInfo}></DealershipSelector>*/}
			</CustomContent>
		</Page>
	)
}

export default DealershipsPage



