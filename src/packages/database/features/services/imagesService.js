import { imagesRepository } from "../repositories/imagesRepository";

const imagesService = {
    //insert a new image
    insertImage: async ([image_status, image_type, hotspot_id, vehicle_id, image_data]) => {
        return await imagesRepository.insertImage([image_status, image_type, hotspot_id, vehicle_id, image_data]);
    },
    //get all images
    getAllImages: async () => {
        return await imagesRepository.getAllImages();
    },
    //get all images by vehicle id
    getAllImagesByVehicleId: async ([vehicle_id]) => {
        return await imagesRepository.getAllImagesByVehicleId([vehicle_id]);
    },
    //get all images by hotspot id
    getAllImagesByHotspotId: async ([hotspot_id]) => {
        return await imagesRepository.getAllImagesByHotspotId([hotspot_id]);
    },
    //delete an image
    deleteImage: async ([image_id]) => {
        await imagesRepository.deleteImage([image_id]);
    },
    //delete all images by vehicle id
    deleteAllImagesByVehicleId: async ([vehicle_id]) => {
        await imagesRepository.deleteAllImagesByVehicleId([vehicle_id]);
    }
}

export { imagesService };
    