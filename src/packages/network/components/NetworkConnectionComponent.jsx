import { IonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import { network as net } from '../features/network';
import { Network } from '@capacitor/network';

const NetworkConnectionComponent = () => {
	const network = net;
	const [connected, setConnected] = useState(true);
	
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
			message="You are not connected to the Internet"
			position="top"
			buttons={[

				{
					text: 'Close',
					role: 'cancel',
				}
			]}
		></IonToast>
	)
}

export default NetworkConnectionComponent;