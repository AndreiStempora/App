import { useEffect, useState } from 'react';
import usePageRequest from '../../../services/customHooks/pageRequestHook';
import usePageSetters from '../../../services/customHooks/pageRequestSettersHook';
import TwoFaElements from './TwoFaElements';
import { TwoFA } from '../features/TwoFA';
import { useAtom } from 'jotai';

const TwoFaSelectorPage = () => {

    const pageRequest = usePageRequest();
    const requestSetters = usePageSetters();
    const [services,setServices] = useState();
    const [selectedOption,setSelectedOption] = useAtom(TwoFA.selectedOption);

    const twoFAPageRequest = async ()=>{
        requestSetters.setUrl(requestSetters.data?.call);
        requestSetters.setRequestBody();
        const response = await requestSetters.fetch();
        console.log('raaaaaaaaaaaa',response.services);

        if(response?.services.length === 1){
            setSelectedOption(response?.services);
            requestSetters.push("/2FA/service");
        } else {
            setServices(response?.services);
        }
    }

    useEffect(()=>{
        pageRequest(twoFAPageRequest);
    },[])

    return (
        <TwoFaElements services={services}></TwoFaElements>
    )
}

export default TwoFaSelectorPage