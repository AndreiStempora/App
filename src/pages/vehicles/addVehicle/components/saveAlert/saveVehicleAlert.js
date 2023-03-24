import {useIonAlert} from "@ionic/react";
import {useRSelection} from "../../../../../services/customHooks/utilityHooks";
import {useHistory} from "react-router";
import {useDbRequest, vehiclesService} from "../../../../../packages/database";
import { useLanguage } from "../../../../../packages/multiLanguage";
const useSaveVehicleAlert = () => {
      const history = useHistory();
      const [presentAlert] = useIonAlert();
      const [translate] = useLanguage();
      const [setCurrentSelection, getCurrentSelection] = useRSelection();
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
            if (vehicle) {
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
            }
      }
      const openAlert = async (vehicleVin,setSearchText,setDisabledSave) => {
            await presentAlert({
                  header: translate('Add Vehicle'),
                  message: translate('Are you sure you want to add this vehicle?'),
                  buttons: [
                        translate('Cancel'),
                        {
                              text: translate('Add'), handler: async () => {
                                    await searchForVehicleInDb(vehicleVin);
                                    await dbRequest.requestFunction(async () => {
                                          return await vehiclesService.getVehicleByVin([vehicleVin]);
                                    });
                                    // console.log(x, 'x', vehicleVin, 'vehicleVin');
                                    setSearchText('');
                                    setDisabledSave(true);
                                    history.push("/vehicle-details");
                              }
                        },
                  ],
            })
      }

      return {openAlert};
}

export default useSaveVehicleAlert;