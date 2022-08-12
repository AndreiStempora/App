import Page from '../../components/page/Page';

import { URL as myUrl, usePageRequest, usePageSetters } from "../../services"
import { IonContent, IonHeader, IonToolbar,IonTitle} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import "./dealershipsPage.scss";
import { DealershipSelector } from '../../packages/database';
import { CameraComponent } from '../../packages/camera';
import { network } from '../../packages/network';

const DealershipsPage = () => {
	const pageRequest = usePageRequest();
    const requestSetters = usePageSetters();
	const [dealershipsURL] = useAtom(myUrl.dealership);
	const [inventoryURL] = useAtom(myUrl.inventory);
	let [dealerships, setDealerships] = useState(null);
	let [carInventory, setCarInventory] = useState(null);

	const requestTableContentDealerships = async ()=>{
		requestSetters.setUrl(dealershipsURL);
		requestSetters.setRequestBody();
		const response = await requestSetters.fetch();
		return response;
	}

	const requestTableContentVehicles = async ()=>{
		requestSetters.setUrl(inventoryURL);
		requestSetters.setFormData({dealership:1})
		requestSetters.setRequestBody();
		const response = await requestSetters.fetch();
		return response;
	}
	

	useEffect(() => {
		(async()=>{
			if(await network.getCurrentNetworkStatus()){
				const response = await pageRequest.requestFunction(requestTableContentDealerships);
				setDealerships(response.dealerships);
				const response2 = await pageRequest.requestFunction(requestTableContentVehicles);
				setCarInventory(response2.vehicles);
			}
		})()
	}, []);

	return (
		<Page pageClass={'dealersipSelect'}>
			<IonHeader>
				<IonToolbar>
					<IonTitle className='ion-text-center'>Dealerships</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<DealershipSelector dealerships={dealerships} inventory={carInventory} ></DealershipSelector>
			</IonContent>
		</Page>
	)
}

export default DealershipsPage