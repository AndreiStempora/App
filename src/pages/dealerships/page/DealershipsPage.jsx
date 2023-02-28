import { Page, CustomContent, CustomHeader } from '../../../components/page/Page';
import { URL as myUrl, usePageRequest, usePageSetters } from "../../../services"
import { IonTitle } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { network } from '../../../packages/network';
import DealershipSelector from '../components/DealershipSelector';
import { FS } from '../../../packages/filesystem';
import "./dealershipsPage.scss";

///////////////////////////////////////
import { useLanguage } from '../../../packages/multiLanguage';
///////////////////////////////////////


const DealershipsPage = () => {
	const pageRequest = usePageRequest();
	const requestSetters = usePageSetters();
	const [dealershipsURL] = useAtom(myUrl.dealership);
	const [inventoryURL] = useAtom(myUrl.inventory);
	const [requestInfo, setRequestInfo] = useState(null);

	///////////////////////////////////////
	const [translate, changeLanguage] = useLanguage();
	///////////////////////////////////////

	const requestTableContentDealerships = async () => {
		requestSetters.setUrl(dealershipsURL);
		requestSetters.setRequestBody();
		const response = await requestSetters.fetch();
		return response;
	}

	const requestTableContentVehicles = async (dealerships) => {
		try {
			return await Promise.all(
				dealerships?.map(async dealership => {
					requestSetters.setUrl(inventoryURL);
					requestSetters.setFormData({ dealership: dealership.id });
					requestSetters.setRequestBody();
					return { [dealership.id]: (await requestSetters.fetch()).vehicles };
				})
			)
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		(async () => {
			if (await network.getCurrentNetworkStatus()) {
				const response = await pageRequest.requestFunction(requestTableContentDealerships);
				const vehicleArrays = await requestTableContentVehicles(response?.dealerships);
				setRequestInfo({ dealerships: response?.dealerships, vehicles: vehicleArrays });
			} else {
				setRequestInfo(null);
			}

			await FS.createDirectory('images')
			console.log(window.navigator.languages);
		})();
	}, []);

	return (
		<Page pageClass={'dealersipSelect'}>
			<CustomHeader>
				<IonTitle className='ion-text-center'>{translate('Dealerships')}</IonTitle>
			</CustomHeader>
			<CustomContent
				gridClassStr={"content-in-center vertical-centering"}
				colClassStr={[[12], [12]]}
			>
				<DealershipSelector info={requestInfo}></DealershipSelector>
			</CustomContent>
		</Page>
	)
}

export default DealershipsPage



