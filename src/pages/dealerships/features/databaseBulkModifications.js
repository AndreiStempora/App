import {useIonAlert} from "@ionic/react";
import {
      DB,
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
            // const d2 = await dbRequest.requestFunction(async () => settingsService.getAllSettingsByDealershipId([2]));
            const e = await dbRequest.requestFunction(async () => imagesService.getAllImages());
            const f = await dbRequest.requestFunction(async () => logService.getAllLogs());
            const aaaaaaa = await dbRequest.requestFunction(async () => vehiclesService.getVehicleByVin(['Red market']));
            // console.log(a, b, c, d1, d2, e, f, "all");
            console.log(a, b, c, d1, e, f, aaaaaaa, "aaaaaaa");
      }

      const compareDealerships = async (serverDealerships) => {
            const localDealerships = await dbRequest.requestFunction(async () => await dealershipsService.getAllDealerships());
            // console.log(localDealerships, serverDealerships, 'localDealerships, serverDealerships');
            // filter dealerships that are in server but not in local
            const newDealerships = serverDealerships?.filter(serverDealership => !localDealerships?.some(localDealership => parseInt(localDealership.dealership_id) === parseInt(serverDealership.id)));
            // filter dealerships that are in local but not in server
            const deletedDealerships = localDealerships?.filter(localDealership => !serverDealerships.some(serverDealership => parseInt(serverDealership.id) === parseInt(localDealership.dealership_id)));

            return {addDealerships: newDealerships, deleteDealerships: deletedDealerships};
      }
      const addVehiclesForEachNewDealership = async (newDealerships,serverVehicles) => {
            console.log(newDealerships,serverVehicles, 'newDealerships,serverVehicles');
            await Promise.all(newDealerships.map(async dealership => {
                  const vehicles = await getVehiclesArrayThatMatchDealershipId(dealership, serverVehicles);
                  await dbRequest.requestFunction(async () => await vehiclesService.insertAllVehicles([vehicles, dealership.id]));
            }));
      }

      const getVehiclesArrayThatMatchDealershipId = async (dealership, serverVehicles) => {
            let vehicles;
            serverVehicles.map(serverVehicle => {
                  if(parseInt(dealership.id) in serverVehicle){
                        vehicles =  serverVehicle[dealership.id]
                  }
            })
            return vehicles;
      }
      const addDealershipConfigToDatabase = async (dealership) => {
            const hotspots = dealership?.config?.hotspots;
            hotspots?.map(async (hotspot) => {
                  //HOTSPOT INTERIOR  = 1
                  //HOTSPOT EXTERIOR = 2
                  let hotspotType;
                  if (hotspot.type === "interior") {
                        hotspotType = 1;
                  } else {
                        hotspotType = 2;
                  }
                  await dbRequest.requestFunction(async () => hotspotsService.insertHotspot([dealership.id, hotspot.name, hotspotType]));
            })
      }
      const handleDealershipExistence = async (serverDealerships) =>{
            if(!serverDealerships){
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
            if(serverDealerships){
                  const dealershipComparison = await compareDealerships(serverDealerships);
                  console.log(dealershipComparison, 'dealership comparison');
            }
      }
      const deleteOldDealerships = async (deletedDealerships) => {
            await deletedDealerships.map(async dealership =>{
                  await dbRequest.requestFunction(async () => await dealershipsService.deleteDealershipById([dealership.id]));
                }
            );

      }
      const addNewDealerships = async (newDealerships) => {
            await Promise.all(newDealerships.map(async dealership => {
                  await addDealershipConfigToDatabase(dealership);
                  const logoBlob = await (await fetch(dealership.logo)).blob();
                  const base64string = await DB.blobToBase64(logoBlob);
                  await dbRequest.requestFunction(async () => await dealershipsService.insertDealership([parseInt(dealership.id),dealership.dealer,base64string]));
            }));
      }

      const deleteIrrelevantVehicles = async (serverDealerships, serverVehicles) => {
            serverDealerships.map(async dealership => {
                  const serverDealershipVehicles = await getVehiclesArrayThatMatchDealershipId(dealership, serverVehicles);
                  const localDealershipVehicles = await dbRequest.requestFunction(async () => await vehiclesService.getAllVehiclesByDealershipId([parseInt(dealership.id)]));
                  console.log(serverDealerships, serverVehicles, 'serverDealerships, serverVehicles');
                  //find vehicles that are in local but not in server
                  await dbRequest.requestFunction(async () => await vehiclesService.insertVehicle([1,"AAAAAAAAA", "stock","date","model", "trim", "interior", "exterior","hotspots"]));
                  const vehiclesToDelete = localDealershipVehicles?.filter(localVehicle => !serverDealershipVehicles.some(serverVehicle => parseInt(serverVehicle.vin) === parseInt(localVehicle.vin)));

            })
      }
      //things coming from the server are the important ones
      //get server dealerships and compare to local dealerships
      //if server dealership is not in local, add it
      //if server dealership is in local, update it
      //if local dealership is not in server, delete it
      const updateDatabase = async () => {
            const {serverDealerships, serverVehicles} = await getDealerships();
            await handleDealershipExistence(serverDealerships);
            const {addDealerships, deleteDealerships} = await compareDealerships(serverDealerships);
            await deleteOldDealerships(deleteDealerships);
            await addNewDealerships(addDealerships);
            await addVehiclesForEachNewDealership(addDealerships, serverVehicles);

            await getAllDBContents();

      }

      return updateDatabase;
}

export default useUpdateDatabase;