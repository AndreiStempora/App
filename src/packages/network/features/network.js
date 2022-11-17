import { Network } from '@capacitor/network';
import { atom } from 'jotai';

export const network = {
    networkListener: atom(false),
    listenerActivated:false,

    getCurrentNetworkStatus:async ()=>{
        return (await Network.getStatus()).connected;
    },

    getCurrentNetworkType:async ()=>{
        return (await Network.getStatus()).connectionType;
    },

    addNetworkListener: async () => {
        if(!network.listenerActivated){
            Network.addListener('networkStatusChange', async () => {
                network.networkStatus = (await network.getCurrentNetworkStatus());
            });
            network.listenerActivated = true;
        }
    }
}

