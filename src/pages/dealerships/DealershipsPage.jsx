import Page from '../../components/page/Page';
import usePageRequest from "../../services/customHooks/pageRequestHook";
import usePageSetters from '../../services/customHooks/pageRequestSettersHook';
import { URL as myUrl } from '../../services/Requests/importantUrls';
import { IonButton, IonContent } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import "./dealershipsPage.scss";
import { network } from '../../packages/network';
import { DB, dealershipsService, logService, tests, vehiclesService, useDbRequest } from '../../packages/database';

const DealershipsPage = () => {
	const pageRequest = usePageRequest();
    const requestSetters = usePageSetters();
	const dbRequest = useDbRequest();
	const [summary] = useAtom(myUrl.dealership);
	const [inventory] = useAtom(myUrl.inventory);
	// let dealerships;

	const requestTableContentDealerships = async ()=>{
		requestSetters.setUrl(summary);
		requestSetters.setRequestBody();
		const response = await requestSetters.fetch();
		return response;
	}

	const requestTableContentvehicles = async ()=>{
		requestSetters.setUrl(inventory);
		requestSetters.setFormData({dealership:1})
		requestSetters.setRequestBody();
		const response = await requestSetters.fetch();
		return response;
	}
	

	const dbCalls = async()=>{
		
	}
	

	useEffect(() => {
		(async()=>{	
			//if network is online, fetch from server and save to db else fetch from db
			if(network.getCurrentNetworkStatus()){

				let requestDealerships = (await pageRequest.requestFunction(requestTableContentDealerships)).dealerships;
				// for each dealership request the logo
				let requestLogos = requestDealerships.map(async(dealership)=>{
					let logo = await fetch(dealership.logo);
						
						return await {...dealership, logo:await logo.blob()};
					})
				console.log(await requestLogos)
				
				// theDealerships?.forEach(async dealership => {
				// 	let logo = await fetch(dealership.logo);
				// 	console.log(await logo.blob(),"logo");
				// })
			} else {
				let dealerships = await dbRequest.requestFunction(dealershipsService.getAllDealerships);
			}
			// console.log(dealerships);
			// console.log(dealerships,'rr')
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