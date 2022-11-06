import { useAtom } from "jotai";
import { user } from "../../../../services/user/user";
import { useDbRequest, hotspotsService, vehiclesService, imagesService  } from "../../index";

const useRSelection = () => {
    const [currentSelection, setCurrentSelection] = useAtom(user.userCurrentSelections);
    const [, getCurrentSelection]= useAtom(user.getCurrentSelections);

    const editSelection = (selection) =>{
        setCurrentSelection((currentSelection) => {
            return {...currentSelection, ...selection}
        })
    }
    return [editSelection, getCurrentSelection];
};


const useHotspot = () => {
    const dbRequest = useDbRequest();
    const [, getCurrentSelection]= useAtom(user.getCurrentSelections);

    const getAllHotspotsForCurrentDealership = async () => {
        const dealership_id = getCurrentSelection().dealership_id;
        return await dbRequest.requestFunction(async () => {
            await hotspotsService.getAllHotspotsByDealershipId([dealership_id]);
        })
    }

    const getCurrentHotspotsByType = async () =>{
        const dealership_id = getCurrentSelection().dealership_id;
        const hotspot_type = getCurrentSelection().hotspot_type;
        return await dbRequest.requestFunction(async () => {
            await hotspotsService.getAllHotspotsByDealershipIdAndHotspotType([dealership_id, hotspot_type]);
        })
    }
    const getCurrentHotspotPhoto = () => {
        const vehicle_id = getCurrentSelection().vehicle_id;
        const hotspot_id = getCurrentSelection().hotspot_id;
        return dbRequest.requestFunction(async () => {
            await imagesService.getImageByVehicleIdAndHotspotId([vehicle_id, hotspot_id]);
        })
    }

    const getHotspotsWithPhotos = async () => {
        const vehicle_id = getCurrentSelection().vehicle_id;
        const hotspots = getAllHotspotsForCurrentDealership();
        const hotspotsWithPhotos = [];
        hotspots.map(async (hotspot) => {
            const photo = await imagesService.getImageByVehicleIdAndHotspotId([vehicle_id, hotspot.hotspot_id]);
            hotspotsWithPhotos.push([hotspot, photo]);
        })
        return hotspotsWithPhotos;
    }

};
export { useRSelection, useHotspot };