import { Network } from '@capacitor/network';

export const network = {
                // ------------ can't make it work -----------//
    // eventListener:async(func)=>{
    //     return Network.addListener('networkStatusChange', async status => ([
    //         await network.getCurrentNetworkStatus(),
    //         await network.getCurrentNetworkType()
    //     ]))
    // },

    getCurrentNetworkStatus:async ()=>{
        return (await Network.getStatus()).connected;
    },

    getCurrentNetworkType:async ()=>{
        return (await Network.getStatus()).connectionType;
    }
}

