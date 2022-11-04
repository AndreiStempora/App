import { useEffect, useState } from 'react';
import { TwoFA } from '../features/TwoFA';
import { useAtom } from 'jotai';
import usePageRequest from '../../../../services/customHooks/pageRequestHook';
import usePageSetters from '../../../../services/customHooks/pageRequestSettersHook';
import TwoFaElements from './TwoFaElements';

const TwoFaSelector = () => {
    const pageRequest = usePageRequest();
    const requestSetters = usePageSetters();
    const [services, setServices] = useState();
    const [selectedOption,setSelectedOption] = useAtom(TwoFA.selectedOption);
    const [,setTwoFAURL] = useAtom(TwoFA.url);
    const [, getTheUrl] = useAtom(TwoFA.getTheUrl);

    const twoFAPageRequest = async ()=>{
        requestSetters.setUrl(getTheUrl());
        requestSetters.setRequestBody();
        const response = await requestSetters.fetch();
        if(response?.services.length === 1){
            setSelectedOption(response?.services[0]);
            setServices(response?.services);
        } else {
            setServices(response?.services);
            }
        }
            
    useEffect(()=>{
        (async ()=>{
            if(requestSetters.data?.call !== undefined){
                setTwoFAURL(requestSetters.data?.call);
            }
        })()

        pageRequest.requestFunction(twoFAPageRequest);
    },[])

    return (
        <TwoFaElements services={services}></TwoFaElements>
    )
}

export default TwoFaSelector;