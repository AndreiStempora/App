import Page from '../../components/page/Page';
import usePageRequest from "../../services/customHooks/pageRequestHook";
import usePageSetters from '../../services/customHooks/pageRequestSettersHook';
import useDbRequest from '../../services/customHooks/databaseOperationsHook';
import { URL as myUrl } from '../../services/Requests/importantUrls';
import { IonContent } from '@ionic/react';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import "./dealershipsPage.scss"
import { DB, dealershipsService } from '../../packages/database';

const DealershipsPage = () => {
	const pageRequest = usePageRequest();
    const requestSetters = usePageSetters();
	const dbRequest = useDbRequest();
	const [summary] = useAtom(myUrl.dealership);

	const requestTableContent = async ()=>{
		requestSetters.setUrl(summary);
		requestSetters.setRequestBody();
		const response = await requestSetters.fetch();
		return response;
	}

	const dbCalls = async ()=>{
		await DB.open();
		dealershipsService.insertDealership(['111', '222', '333']);
		dealershipsService.getAllDealerships();
		dealershipsService.updateDealership(['111', '666', '999']);
		dealershipsService.getDealershipById(['111']);
		// dealershipsService.deleteDealership(['111']);
		dealershipsService.getAllDealerships();
	}

	useEffect(() => {
		(async()=>{
			await dbRequest.requestFunction(dbCalls);
			const x = await pageRequest.requestFunction(requestTableContent);
			console.log(x.dealerships);
		})()
	}, []);

	return (
		<Page>
			<IonContent>
				<div className='red'>DealershipsPage</div>
			</IonContent>
		</Page>
	)
}

export default DealershipsPage