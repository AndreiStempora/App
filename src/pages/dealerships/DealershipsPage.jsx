import Page from '../../components/page/Page';

import { URL as myUrl, usePageRequest, usePageSetters } from "../../services"
import { IonContent, IonHeader, IonToolbar,IonTitle} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import "./dealershipsPage.scss";
import { DealershipSelector } from '../../packages/database';
import { CameraComponent } from '../../packages/camera';

const DealershipsPage = () => {
	const pageRequest = usePageRequest();
    const requestSetters = usePageSetters();
	const [summary] = useAtom(myUrl.dealership);
	const [inventory] = useAtom(myUrl.inventory);
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

			setDealerships(response.dealerships);
		})()
	}, []);

	return (
		<Page>
			<IonHeader>
				<IonToolbar>
					<IonTitle className='ion-text-center'>Dealerships</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<DealershipSelector dealerships={dealerships} ></DealershipSelector>
				<CameraComponent></CameraComponent>
			</IonContent>
		</Page>
	)
}

export default DealershipsPage