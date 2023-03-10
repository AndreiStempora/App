import { useIonAlert} from "@ionic/react";
import {useRSelection} from "../../../../../packages/database/features/utils/utilityHooks";
import { useHistory } from "react-router-dom";
import { useDbRequest, vehiclesService } from "../../../../../packages/database";
const useSaveVehicleAlert = () => {
      const [presentAlert] = useIonAlert();
      const [setCurrentSelection, getCurrentSelection] = useRSelection();
      const history = useHistory();
      const dbRequest = useDbRequest();

      const getVehicleAndSetId = async (vehicleVin) => {
            const checkVehicle = await dbRequest.requestFunction(async () => {
                  return await vehiclesService.getVehicleByVin([vehicleVin]);
            });
            setCurrentSelection({vehicle_id: checkVehicle.vehicle_id});
      }
      const searchForVehicleInDb = async (vehicleVin) => {
            const vehicle = await dbRequest.requestFunction(async () => {
                  return await vehiclesService.getVehicleByVin([vehicleVin]);
            });
            console.log(vehicle, 'vehicle++');
            if(vehicle){
                  console.log('vehicle already exists');
                  await dbRequest.requestFunction(async () =>
                      await dbRequest.requestFunction(async () => await vehiclesService.updateVehicleById([vehicle.vehicle_id, 1, 1]))
                  );
                  await getVehicleAndSetId(vehicleVin);
                  return;
            }

            if (!vehicle) {
                  console.log('vehicle does not exist');
                  await dbRequest.requestFunction(async () =>
                      vehiclesService.addVehicle([getCurrentSelection().dealership_id, vehicleVin, 1, 1])
                  );
                  await getVehicleAndSetId(vehicleVin);
                  return
            }
      }
      const openAlert = async (vehicleVin) =>{
             await presentAlert({
                  header: 'Add Vehicle',
                  message: 'Are you sure you want to add this vehicle?',
                  buttons: [
                        'Cancel',
                        {
                              text: 'Add', handler: async () => {
                                    await searchForVehicleInDb(vehicleVin);
                                    let x = await dbRequest.requestFunction(async () => {
                                          return await vehiclesService.getVehicleByVin([vehicleVin]);
                                    });
                                    console.log(x, 'x', vehicleVin, 'vehicleVin');
                                    // history.push("/vehicle-details");
                              }
                        },
                  ],
            })
      }

      return [openAlert];
}

export default useSaveVehicleAlert;