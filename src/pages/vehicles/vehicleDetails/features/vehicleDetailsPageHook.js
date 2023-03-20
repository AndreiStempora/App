import {useDbRequest, vehiclesService} from '../../../../packages/database';
import {useHotspot} from "../../../../services/customHooks/utilityHooks";
import {useIonAlert} from "@ionic/react";
import {useState} from "react";
import {useRSelection} from "../../../../services/customHooks/utilityHooks";
import {useLanguage} from "../../../../packages/multiLanguage";
import {useHistory} from "react-router";

const useVehicleDetailsPage = () => {
      const dbRequest = useDbRequest();
      const history = useHistory();
      const hotspotHook = useHotspot();
      const [presentAlert] = useIonAlert();
      const [elements, setElements] = useState({});
      const [setCurrentSelection, getCurrentSelection] = useRSelection();
      const [translate] = useLanguage();

      const getPictureCount = async (hotspots) => {
            let counter = 0;
            hotspots.map(async (hotspot) => {
                  if (hotspot.length === 2) {
                        counter++;
                  }
            })
            return counter;
      }
      const getData = async () => {
            console.log(getCurrentSelection(), "current selection");
            const interior = await hotspotHook.getHotspotsWithPhotos(1);
            const exterior = await hotspotHook.getHotspotsWithPhotos(2);
            const interiorPhotos = await getPictureCount(interior);
            const exteriorPhotos = await getPictureCount(exterior);
            const vehicle = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleById([getCurrentSelection().vehicle_id]));
            const elements2 = {
                  interior: interior,
                  exterior: exterior,
                  interiorPhotos: interiorPhotos,
                  exteriorPhotos: exteriorPhotos,
                  vehicle: vehicle
            };
            setElements(elements2);

      }

      const goToPhotosHandler = ( type) => {
            setCurrentSelection({ hotspot_type: type,
                  // refreshPage: !getCurrentSelection().refreshPage
            });
            history.push('/vehicle-photos');
      }

      const addVehicleNameHandler = async() => {
            await presentAlert({
                  header: translate('Add Car Name'),
                  buttons: [
                        { text: translate('Cancel'), role: 'cancel' },
                        {
                              text: translate('Add'),
                              handler: async (data) => {
                                    await dbRequest.requestFunction(async () => await vehiclesService.updateVehicleMakeAndModelById([getCurrentSelection().vehicle_id, data[0], data[1]]));
                                    const vehicle = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleById([getCurrentSelection().vehicle_id]));
                                    setElements({ ...elements, vehicle: vehicle });
                              }
                        }
                  ],
                  inputs: [
                        {
                              placeholder: translate('Maker name'),
                              value: elements.vehicle?.vehicle_make
                        },
                        {
                              placeholder: translate('Car model'),
                              value: elements.vehicle?.vehicle_model
                        }
                  ],
            })
      }

      const goBackToVehiclesPageHandler = () => {
            // setCurrentSelection('refresh');
            history.push('/vehicle-search');
      }

      return {elements, getData, goToPhotosHandler, addVehicleNameHandler, goBackToVehiclesPageHandler, translate};
}

export default useVehicleDetailsPage;