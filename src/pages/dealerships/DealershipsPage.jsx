import Page from '../../components/page/Page';
import { URL as myUrl, usePageRequest, usePageSetters } from "../../services"
import { IonContent, IonHeader, IonToolbar,IonTitle} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import "./dealershipsPage.scss";
import { DealershipSelector } from '../../packages/database';
import { network } from '../../packages/network';
import CustomHeader from '../../components/pageMainComponents/CustomHeader';
import CustomContent  from '../../components/pageMainComponents/CustomContent';
import CustomFooter from '../../components/pageMainComponents/CustomFooter';

const DealershipsPage = () => {
	const pageRequest = usePageRequest();
    const requestSetters = usePageSetters();
	const [dealershipsURL] = useAtom(myUrl.dealership);
	const [inventoryURL] = useAtom(myUrl.inventory); 
	const [requestInfo, setRequestInfo] = useState(null);

	const requestTableContentDealerships = async ()=>{
		requestSetters.setUrl(dealershipsURL);
		requestSetters.setRequestBody();
		const response = await requestSetters.fetch();
		return response;
	}

	const requestTableContentVehicles = async (dealerships)=>{
		try{
			return await Promise.all(
				dealerships?.map(async dealership => {
					requestSetters.setUrl(inventoryURL);
					requestSetters.setFormData({dealership:dealership.id});
					requestSetters.setRequestBody();
					return {[dealership.id]:(await requestSetters.fetch()).vehicles};
				})
			)
		} catch (e){
			console.log(e);
		}
	}

	useEffect(() => {
		(async()=>{
			if(await network.getCurrentNetworkStatus()){
				const response = await pageRequest.requestFunction(requestTableContentDealerships);
				const vehicleArrays = await requestTableContentVehicles(response?.dealerships);
				setRequestInfo({dealerships:response?.dealerships, vehicles:vehicleArrays});
			}
		})()
	}, []);

	return (
		<Page pageClass={'dealersipSelect'}>
			<CustomHeader>
				<IonTitle className='ion-text-center'>Dealerships</IonTitle>
			</CustomHeader>
			<IonContent>
				<DealershipSelector info={requestInfo}></DealershipSelector>
			</IonContent>
			
		</Page>
	)
}

export default DealershipsPage