import { vehiclesRepository } from "../repositories/vehiclesRepository";

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
    }
}

export { vehiclesService };