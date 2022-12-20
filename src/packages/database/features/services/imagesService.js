import { imagesRepository } from "../repositories/imagesRepository";
import { FS } from "../../../filesystem";

const imagesService = {
    //insert a new image
    insertImage: async ([image_status, image_type, hotspot_id, vehicle_id, image_data]) => {
        return await imagesRepository.insertImage([image_status, image_type, hotspot_id, vehicle_id, image_data]);
    },

    //get all images
    getAllImages: async () => {
        return await imagesRepository.getAllImages();
    },

    //get imagge by id
    getImageById: async ([image_id]) => {
        return await imagesRepository.getImageById([image_id]);
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
    deleteImageById: async ([image_id]) => {
        await imagesRepository.getImageById([image_id]).then(async (image) => {
            console.log("deleteImageById: image: ", image);
            let wasFileDeleted = await FS.deleteFile(image[0].image_data);
            console.log("deleteImageById: wasFileDeleted: ", wasFileDeleted)
            if (wasFileDeleted === true || wasFileDeleted == "File does not exist") {
                await imagesRepository.deleteImageById([image_id]);
                return true;
            } else {
                return false;
            }
        });
    },
    //delete all images by vehicle id
    deleteAllImagesByVehicleId: async ([vehicle_id]) => {
        await imagesRepository.deleteAllImagesByVehicleId([vehicle_id]);
    },
    //get image by vehicle id and hotspot id
    getImageByVehicleIdAndHotspotId: async ([vehicle_id, hotspot_id]) => {
        return await imagesRepository.getImageByVehicleIdAndHotspotId([vehicle_id, hotspot_id]);
    },
}

export { imagesService };
