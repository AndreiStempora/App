import { IonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import { network as net } from '../features/network';
import { Network } from '@capacitor/network';
import {useLanguage} from "../../multiLanguage";

const NetworkConnectionComponent = () => {
	const network = net;
	const [connected, setConnected] = useState(true);
	const [translate] = useLanguage();
	
	const logCurrentNetworkConnectionStatus = async () => {
		setConnected(await network.getCurrentNetworkStatus());
	}

	useEffect(() => {
		(async () => {
			if(!network.listenerActivated){
				Network.addListener('networkStatusChange', async () => {
					await logCurrentNetworkConnectionStatus();
				});
				network.listenerActivated = true;
			} else {
				await logCurrentNetworkConnectionStatus();
			}
		})()
	}, [])


	return (
		<IonToast
			isOpen={!connected}
			message={translate("You are not connected to the Internet")}
			position="top"
			buttons={[

				{
					text: translate('Close'),
					role: 'cancel',
				}
			]}
		></IonToast>
	)
}

export default NetworkConnectionComponent;