import { IonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import { network as net } from '../features/network';
import { Network } from '@capacitor/network';

const NetworkConnectionComponent = () => {
	const network = net;
	const [connected, setConnected] = useState(true);
	const [event, setEvent] = useState(false);

	const logCurrentNetworkConnectionStatus = async () => {
		setConnected(await network.getCurrentNetworkStatus());
	}

	useEffect(() => {
		logCurrentNetworkConnectionStatus();
		(async () => {
			if (!event) {
				Network.addListener('networkStatusChange', async () => {
					setConnected(await network.getCurrentNetworkStatus());
				});
				setEvent(true);
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