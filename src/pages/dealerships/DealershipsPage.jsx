import Page from '../../components/page/Page';
import { URL as myUrl, usePageRequest, usePageSetters } from "../../services"
import { IonContent, IonHeader, IonToolbar,IonTitle} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import "./dealershipsPage.scss";
import { DealershipSelector } from '../../packages/database';
import { network } from '../../packages/network';

const DealershipsPage = () => {
	const pageRequest = usePageRequest();
    const requestSetters = usePageSetters();
	const [dealershipsURL] = useAtom(myUrl.dealership);
	const [inventoryURL] = useAtom(myUrl.inventory);
	const [dealerships, setDealerships] = useState(null);
	const [carInventory, setCarInventory] = useState([]);

	const requestTableContentDealerships = async ()=>{
		requestSetters.setUrl(dealershipsURL);
		requestSetters.setRequestBody();
		const response = await requestSetters.fetch();
		return response;
	}
	const requestTableContentInventory = async (dealershipId)=>{
		requestSetters.setUrl(inventoryURL);
		requestSetters.setRequestBody({dealership:dealershipId});
		const response = await requestSetters.fetch();
		return response;
	}
	const requestTableContentVehicles = async (dealershipId)=>{
		// let arr = [];
		// dealerships.map(dealership => {
		// 	requestSetters.setUrl(inventoryURL);
		// 	requestSetters.setFormData({dealership:dealership.id});
		// 	requestSetters.setRequestBody();
		// 	requestSetters.fetch().then(response => {
		// 		setCarInventory([...carInventory, {[dealership.id]:response.vehicles}]);
		// 	})
		// })
		//for each dealership, request the inventory for that dealership

		}
	

	useEffect(() => {
		(async()=>{
			if(await network.getCurrentNetworkStatus()){
				const response = await pageRequest.requestFunction(requestTableContentDealerships);
				setDealerships(response.dealerships);
				
				// const response2 = await pageRequest.requestFunction(requestTableContentVehicles(response.dealerships));
				// setCarInventory(response2);
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