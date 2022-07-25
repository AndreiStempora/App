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
    const [,setSelectedOption] = useAtom(TwoFA.selectedOption);

    const twoFAPageRequest = async ()=>{
        requestSetters.setUrl(requestSetters.data?.call);
        requestSetters.setRequestBody();
        const response = await requestSetters.fetch();
        if(response?.services.length === 2){
            setSelectedOption(response?.services);
            // requestSetters.push("/2fa/code");
        } else {
            setServices(response?.services);
        }
    }

    useEffect(()=>{
        pageRequest.requestFunction(twoFAPageRequest);
    },[])

    return (
        <TwoFaElements services={services}></TwoFaElements>
    )
}

export default TwoFaSelector;