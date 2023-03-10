import {useIonAlert} from "@ionic/react";
import {
      dealershipsService,
      hotspotsService, imagesService, logService,
      settingsService,
      useDbRequest,
      vehiclesService
} from "../../../packages/database";
import {useState} from "react";
import {useLanguage} from "../../../packages/multiLanguage";
import {useHistory} from "react-router";
import {useRSelection} from "../../../packages/database/features/utils/utilityHooks";
import useGetDealerships from "./serverRequests";

const useUpdateDatabase = () => {
      const dbRequest = useDbRequest();
      const [translate] = useLanguage();
      const [dealershipElements, setDealershipElements] = useState([]);
      const [presentAlert] = useIonAlert();
      const [editSelection, getSelection] = useRSelection();
      const history = useHistory();
      const getDealerships = useGetDealerships();



      const getAllDBContents = async () => {
            const a = await dbRequest.requestFunction(async () => dealershipsService.getAllDealerships());
            const b = await dbRequest.requestFunction(async () => vehiclesService.getAllVehicles());
            const c = await dbRequest.requestFunction(async () => hotspotsService.getAllHotspots());
            const d1 = await dbRequest.requestFunction(async () => settingsService.getAllSettingsByDealershipId([1]));
            const d2 = await dbRequest.requestFunction(async () => settingsService.getAllSettingsByDealershipId([2]));
            const e = await dbRequest.requestFunction(async () => imagesService.getAllImages());
            const f = await dbRequest.requestFunction(async () => logService.getAllLogs());
            const aaaaaaa = await dbRequest.requestFunction(async () => vehiclesService.getVehicleByVin(['Red market']));
            // console.log(a, b, c, d1, d2, e, f, "all");
            console.log(a, b, c, d1, d2, e, f, aaaaaaa, "aaaaaaa");
      }

      const compareDealerships = async (serverDealerships) => {
            const localDealerships = await dbRequest.requestFunction(async () => await dealershipsService.getAllDealerships());
            console.log(localDealerships, serverDealerships, 'localDealerships, serverDealerships');
            // filter dealerships that are in server but not in local
            const newDealerships = serverDealerships?.filter(serverDealership => !localDealerships?.some(localDealership => parseInt(localDealership.dealership_id) === serverDealership.dealership_id));
            // filter dealerships that are in local but not in server
            const deletedDealerships = localDealerships?.filter(localDealership => !serverDealerships.some(serverDealership => parseInt(serverDealership.dealership_id) === localDealership.dealership_id));
            return {addDealerships: newDealerships, deleteDealerships: deletedDealerships};
      }

      const handleDealershipExistence = async (serverInfo) =>{
            if(!serverInfo){
                  const localDealerships = await dbRequest.requestFunction(async () => await dealershipsService.getAllDealerships());
                  if(!localDealerships){
                        return presentAlert({
                              header: translate('On your first login on this device you will need to have access to the Internet'),
                              cssClass: 'custom-alert',
                              buttons: [
                                    {
                                          text: 'Ok',
                                          cssClass: 'alert-button-confirm',
                                    },
                                    {
                                          text: translate('Retry'),
                                          handler: () => {
                                                window.location.reload();
                                          }
                                    }
                              ],
                        })
                  }
                  if(localDealerships){
                        return;
                  }
            }
            if(serverInfo){
                  const dealershipComparison = await compareDealerships(serverInfo.dealerships);
                  console.log(dealershipComparison, 'dealership comparison');
            }
      }

      //things coming from the server are the important ones
      //get server dealerships and compare to local dealerships
      //if server dealership is not in local, add it
      //if server dealership is in local, update it
      //if local dealership is not in server, delete it
      const updateDatabase = async () => {
            const serverInfo = await getDealerships();
            await handleDealershipExistence(serverInfo);
            const dealershipComparison = await compareDealerships(serverInfo.dealerships);
            console.log(serverInfo, dealershipComparison, 'server in db update');

      }

      return updateDatabase;
}

export default useUpdateDatabase;