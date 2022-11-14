import { useAtom } from "jotai";
import { user } from "../../../../services/user/user";
import { useDbRequest, hotspotsService, vehiclesService, imagesService  } from "../../index";
import { FS } from "../../../filesystem";

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
            return await hotspotsService.getAllHotspotsByDealershipId([dealership_id]);
        })
    }

    const getCurrentHotspotsByType = async () =>{
        const dealership_id = getCurrentSelection().dealership_id;
        const hotspot_type = getCurrentSelection().hotspot_type;
        return await dbRequest.requestFunction(async () => {
            return await hotspotsService.getAllHotspotsByDealershipIdAndHotspotType([dealership_id, hotspot_type]);
        })
    }

    const getCurrentHotspotsByGivenType = async (hotspot_type) =>{
        const dealership_id = getCurrentSelection().dealership_id;
        return await dbRequest.requestFunction(async () => {
            return await hotspotsService.getAllHotspotsByDealershipIdAndHotspotType([dealership_id, hotspot_type]);
        })
    }

    const getCurrentHotspotPhoto = async (hotspot_id) => {
        const vehicle_id = getCurrentSelection().vehicle_id;
        return await dbRequest.requestFunction(async () => {
            return await imagesService.getImageByVehicleIdAndHotspotId([vehicle_id, hotspot_id]);
        })
    }

    const getHotspotsWithPhotos = async (hotspot_type) => {
        if(hotspot_type === undefined){
            const vehicle_id = getCurrentSelection().vehicle_id;
            const hotspots = await getAllHotspotsForCurrentDealership();
            return await Promise.all(
                hotspots?.map(async (hotspot) => {
                    const photo = await imagesService.getImageByVehicleIdAndHotspotId([vehicle_id, hotspot.hotspot_id]);
                    return [hotspot, ...photo]
                })
            )
        } else {
            const vehicle_id = getCurrentSelection().vehicle_id;
            const hotspots = await getCurrentHotspotsByGivenType(hotspot_type);

            return await Promise.all(
                hotspots?.map(async (hotspot) => {
                    const photo = await imagesService.getImageByVehicleIdAndHotspotId([vehicle_id, hotspot.hotspot_id]);
                    return [hotspot, ...photo];

                })
            )
        }
    }

    const getHotspotsByGivenType = async (hotspot_type) => {
        const dealership_id = getCurrentSelection().dealership_id;
        const hotspots = await dbRequest.requestFunction(async () => {
            return await hotspotsService.getAllHotspotsByDealershipIdAndHotspotType([dealership_id, hotspot_type]);
        })
        return hotspots;
    }
    
    return {
        getAllHotspotsForCurrentDealership:getAllHotspotsForCurrentDealership, 
        getCurrentHotspotsByType:getCurrentHotspotsByType, 
        getCurrentHotspotPhoto:getCurrentHotspotPhoto, 
        getHotspotsWithPhotos:getHotspotsWithPhotos,
        getHotspotsByGivenType:getHotspotsByGivenType
    };
};

const useDeleteUpload = () => {
    const dbRequest = useDbRequest();
    const deleteImage = async (image) => {
        let x = await FS.deleteFile(image.image_data);
        console.log(x);
        if(x){
            await dbRequest.requestFunction(async () => {await imagesService.deleteImageById([image.image_id])});
        }
    }
    // const deleteCar = async (vehicle_id) => {
}

export { useRSelection, useHotspot, useDeleteUpload };