import { vehiclesRepository } from "../repositories/vehiclesRepository";
import { imagesService } from "./imagesService";

const vehiclesService = {

    //insert a new vehicle
    insertVehicle: async ([dealership_id, vehicle_vin, vehicle_stock, vehicle_date, vehicle_make, vehicle_model, vehicle_trim, vehicle_interior, vehicle_exterior, vehicle_hotspots]) => {
        return await vehiclesRepository.insertVehicle([dealership_id, vehicle_vin, vehicle_stock, vehicle_date, vehicle_make, vehicle_model, vehicle_trim, vehicle_interior, vehicle_exterior, vehicle_hotspots]);
    },

    //get all vehicles
    getAllVehicles: async () => {
        return await vehiclesRepository.getAllVehicles();
    },

    //get a vehicle by id
    getVehicleById: async ([vehicle_id]) => {
        return await vehiclesRepository.getVehicleById([vehicle_id]);
    },

    //get all vehicles by vin
    getAllVehiclesByVin: async ([vehicle_vin]) => {
        return await vehiclesRepository.getAllVehiclesByVin([vehicle_vin]);
    },
    
    //get all vehicles that don't have empty fields
    getAllVehiclesWithoutEmptyFields: async () => {
        return await vehiclesRepository.getAllVehiclesWithoutEmptyFields();
    },

    //delete a vehicle by id
    deleteVehicleById: async ([vehicle_id]) => {
        const images = await imagesService.getAllImagesByVehicleId([vehicle_id]);
        images.map(async (image) => {
            await imagesService.deleteImage([image.image_id]);
        });
        await vehiclesRepository.deleteVehicleById([vehicle_id]);
    },

    getAllVehiclesByDealershipId: async ([dealership_id]) => {
        return await vehiclesRepository.getAllVehiclesByDealershipId([dealership_id]);
    },

    deleteAllVehiclesByDealershipId: async ([dealership_id]) => {
        const vehicles = await vehiclesService.getAllVehiclesByDealershipId([dealership_id]);
        vehicles.map(async (vehicle) => {
            await vehiclesService.deleteVehicleById([vehicle.vehicle_id]);
        })
    }
    
}

export { vehiclesService };