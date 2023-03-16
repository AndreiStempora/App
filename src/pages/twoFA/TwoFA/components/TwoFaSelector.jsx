import {useEffect, useState} from 'react';
import {TwoFA} from '../features/TwoFA';
import {useAtom} from 'jotai';
import usePageRequest from '../../../../services/customHooks/pageRequestHook';
import usePageSetters from '../../../../services/customHooks/pageRequestSettersHook';
import TwoFaElements from './TwoFaElements';
import useRefreshPage from "../../../../services/customHooks/refreshCurrentPageImproved";

const TwoFaSelector = () => {
      const pageRequest = usePageRequest();
      const requestSetters = usePageSetters();
      const [services, setServices] = useState();
      const [selectedOption, setSelectedOption] = useAtom(TwoFA.selectedOption);
      const [, setTwoFAURL] = useAtom(TwoFA.url);
      const [, getTheUrl] = useAtom(TwoFA.getTheUrl);
      const {refreshPage, history} = useRefreshPage();

      const twoFAPageRequest = async () => {
            console.log('requesting 2fa page function call')
            requestSetters.setUrl(getTheUrl());
            requestSetters.setRequestBody();
            const response = await requestSetters.fetch();
            if (response?.services.length === 1) {
                  setSelectedOption(response?.services[0]);
                  setServices(response?.services);
            } else {
                  setServices(response?.services);
            }
      }

      useEffect(() => {
            (async () => {
                  await refreshPage('/2fa', async () => {
                        if (requestSetters.data?.call !== undefined) {
                              setTwoFAURL(requestSetters.data?.call);
                        }
                        await pageRequest.requestFunction(twoFAPageRequest);
                  })

            })()
      }, [history.location.pathname])

      return (
          <TwoFaElements services={services}></TwoFaElements>
      )
}

export default TwoFaSelector;