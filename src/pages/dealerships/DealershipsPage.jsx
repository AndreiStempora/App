import Page from '../../components/page/Page';

import { URL as myUrl, usePageRequest, usePageSetters } from "../../services"
import { IonContent, IonHeader, IonToolbar,IonTitle} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import "./dealershipsPage.scss";
import { DealershipSelector } from '../../packages/database';

const DealershipsPage = () => {
	const pageRequest = usePageRequest();
    const requestSetters = usePageSetters();
	const [summary] = useAtom(myUrl.dealership);
	const [inventory] = useAtom(myUrl.inventory);
	// let dealerships;
	let [dealerships, setDealerships] = useState(null);

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
	

	useEffect(() => {
		(async()=>{	
			const response = await  pageRequest.requestFunction(requestTableContentDealerships);
			// console.log(response)
			setDealerships(response.dealerships);
		})()
	}, []);

	return (
		<Page>
			<IonHeader>
				<IonToolbar>
					<IonTitle class='ion-text-center'>Inline Modal</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{/* <div className='red'>DealershipsPage</div> */}
				<DealershipSelector dealerships={dealerships} ></DealershipSelector>
			</IonContent>
		</Page>
	)
}

export default DealershipsPage