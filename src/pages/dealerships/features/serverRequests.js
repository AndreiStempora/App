import {URL as myUrl, usePageRequest, usePageSetters} from "../../../services";
import {useAtom} from "jotai";
import {network} from "../../../packages/network";


const useGetDealerships = () => {
      const pageRequest = usePageRequest();
      const requestSetters = usePageSetters();
      const [dealershipsURL] = useAtom(myUrl.dealership);
      const [inventoryURL] = useAtom(myUrl.inventory);

      const requestDealerships = async () => {
            requestSetters.setUrl(dealershipsURL);
            requestSetters.setRequestBody();
            const response = await requestSetters.fetch();
            return response;
      }

      const requestVehicles = async (dealerships) => {

            try {
                  return await Promise.all(
                      dealerships?.map(async dealership => {
                            requestSetters.setUrl(inventoryURL);
                            requestSetters.setFormData({ dealership: dealership.id });
                            requestSetters.setRequestBody();
                            return { [dealership.id]: (await requestSetters.fetch()).vehicles };
                      })
                  )
            } catch (e) {
                  console.log(e);
            }
      }


      const callServer = async () => {
            if (await network.getCurrentNetworkStatus()) {
                  const dealershipsArray = await pageRequest.requestFunction(requestDealerships);
                  const vehicleArrays = await requestVehicles(dealershipsArray?.dealerships);
                  return {serverDealerships: dealershipsArray?.dealerships, serverVehicles: vehicleArrays};
            } else {
                  return null;
            }
      }

      return callServer;
}

export default useGetDealerships;

