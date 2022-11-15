import { useAtom } from "jotai";
import { user } from "../../../../services/user/user";
import { useDbRequest, hotspotsService, vehiclesService, imagesService  } from "../../index";
import { FS } from "../../../filesystem";
import { URL, usePageSetters, usePageRequest } from "../../../../services"

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
    const pageSetters = usePageSetters();
    const pageRequest = usePageRequest();
    const [uploadURL,] = useAtom(URL.upload);
    const [, getCurrentSelection]= useRSelection();
    const [token,] = useAtom(user.tokenAtom);
    const deleteImage = async (image) => {
        let x = await FS.deleteFile(image.image_data);
        console.log(x);
        if(x){
            await dbRequest.requestFunction(async () => {await imagesService.deleteImageById([image.image_id])});
        }
    }
    const uploadImage = async (image) => {
        let fileData = await FS.showPicture(image.image_data);
        const carVin = await dbRequest.requestFunction(async () => {return await vehiclesService.getVehicleById([getCurrentSelection().vehicle_id])});
        console.log(carVin,'red');
        const response = await fetch(fileData);

        const blob = await response.blob();
        // console.log(uploadURL, "upload");
        pageSetters.setUrl(uploadURL);
        const obj = {
            // token: token,
            dealership: getCurrentSelection().dealership_id,
            hotspot: getCurrentSelection().hotspot_id,
            image: blob,
            vin: carVin.vehicle_vin

        };
        pageSetters.setFormData(obj);
        pageSetters.setRequestBody();
        let x = await pageSetters.fetch();
        console.log(x);
        // const formData = new FormData();
        // formData.append('file', blob, "image.jpg");
        // this.uploadData(formData);
        
        // console.log('upload image', blob);
    }
    // const deleteCar = async (vehicle_id) => {
        return {
            deleteImage:deleteImage,
            uploadImage:uploadImage
        }
}

export { useRSelection, useHotspot, useDeleteUpload };