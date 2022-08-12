import { useEffect, useState } from 'react';
import usePageRequest from '../../../services/customHooks/pageRequestHook';
import usePageSetters from '../../../services/customHooks/pageRequestSettersHook';
import TwoFaElements from './TwoFaElements';
import { TwoFA } from '../features/TwoFA';
import { useAtom } from 'jotai';

const TwoFaSelector = () => {
    const pageRequest = usePageRequest();
    const requestSetters = usePageSetters();
    const [services, setServices] = useState();
    const [selectedOption,setSelectedOption] = useAtom(TwoFA.selectedOption);
    const [twoFAURL,setTwoFAURL] = useAtom(TwoFA.url);

    
    const twoFAPageRequest = async ()=>{
        // console.log(twoFAURL,'selectedOption',requestSetters.data);
        requestSetters.setUrl(twoFAURL);
        requestSetters.setRequestBody();
        const response = await requestSetters.fetch();
        // if(response?.services.length === 1){
            //     setSelectedOption(response?.services[0]);
            //     requestSetters.push("/2fa/code");
            // } else {
                setServices(response?.services);
                // }
            }
            
    useEffect(()=>{
        (async ()=>{
            if(requestSetters.data?.call !== undefined){
                setTwoFAURL(await requestSetters.data?.call);
            }
        })()

        pageRequest.requestFunction(twoFAPageRequest);
    },[])

    return (
        <TwoFaElements services={services}></TwoFaElements>
    )
}

export default TwoFaSelector;