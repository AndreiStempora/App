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
import {useRSelection} from "../../../services/customHooks/utilityHooks";
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
            const aaaaaaa = await dbRequest.requestFunction(async () => vehiclesService.getVehicleByVin(['++==++']));
            // console.log(a, b, c, d1, d2, e, f, "all");
            console.log(a,"all dealerships");
            console.log(b,"all vehicles");
            console.log(c,"all hotspots");
            console.log(d1,"all settings");
            // console.log(d2,"all settings");
            console.log(e,"all images");
            console.log(f,"all logs");
            console.log(aaaaaaa,"vehicle by vin");
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
            // console.log(newDealerships,serverVehicles, 'newDealerships,serverVehicles');
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
                  // console.log(dealershipComparison, 'dealership comparison');
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
            serverDealerships?.map(async dealership => {
                  //see how long it takes to get all vehicles from server
                  const serverDealershipVehicles = await getVehiclesArrayThatMatchDealershipId(dealership, serverVehicles);
                  // await dbRequest.requestFunction(async () => await vehiclesService.addVehicle([1,"????", 1,1]))
                  // await dbRequest.requestFunction(async () => await vehiclesService.insertVehicle([1,"++=++=++", 1,2,3,4,5]));
                  const localDealershipVehicles = await dbRequest.requestFunction(async () => await vehiclesService.getAllVehiclesByDealershipId([parseInt(dealership.id)]));

                  let localVin = {}
                  for(let vehicle of localDealershipVehicles){
                        localVin[vehicle.vehicle_vin] = 0;
                  }

                  let serverVin = {}
                  for (let vehicle of serverDealershipVehicles){
                        serverVin[vehicle.vin] = 1;
                  }

                  let combined = {...localVin, ...serverVin};
                  //this object contains both arrays with vin numbers
                  // if they are on local they will have value 0,
                  //if they are on server they will have value 1
                  //if they are on both they will have value 1 = common items
                  let vehiclesToDeleteArray = Object.keys(combined).filter(key => combined[key] === 0);
                  // console.log(vehiclesToDeleteArray, 'vehiclesToDeleteArray');
                  vehiclesToDeleteArray.map(async vehicle => {
                        const dbVehicle = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleByVin([vehicle]));
                        // console.log(dbVehicle);
                        if(dbVehicle.vehicle_exterior === null && dbVehicle.vehicle_hotspots === null){
                              // console.log('this vehicle was deleted', dbVehicle)
                              await dbRequest.requestFunction(async () => await vehiclesService.deleteVehicleById([dbVehicle.vehicle_id]));
                        }
                        // console.log('this vehicle was not deleted', dbVehicle)
                  })
                  const vehiclesWithPics = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesWithPics([1]));
                  // console.log(vehiclesWithPics, localDealershipVehicles, 'vehiclesWithPics');
                  // console.log(vehiclesToDelete, 'vehiclesToDelete', localDealershipVehicles, serverDealershipVehicles);

            })
      }
      const getDealershipsFromDb = async () => {
            const dealerships = await dbRequest.requestFunction(async () => await dealershipsService.getAllDealerships());
            return dealerships;
      };
      const updateDatabase = async ({serverDealerships, serverVehicles}) => {
            // const {serverDealerships, serverVehicles} = await getDealerships();
            await handleDealershipExistence(serverDealerships);
            const {addDealerships, deleteDealerships} = await compareDealerships(serverDealerships);
            await deleteOldDealerships(deleteDealerships);
            await addNewDealerships(addDealerships);
            await addVehiclesForEachNewDealership(addDealerships, serverVehicles);
            await deleteIrrelevantVehicles(serverDealerships, serverVehicles);


            return await getDealershipsFromDb();
      }

      return updateDatabase;
}

export default useUpdateDatabase;