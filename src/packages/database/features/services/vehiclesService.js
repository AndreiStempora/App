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
    },
    
    //get all vehicles that don't have empty fields
    getAllVehiclesWithoutEmptyFields: async () => {
        return await vehiclesRepository.getAllVehiclesWithoutEmptyFields();
    },

    //update local vehicles
    updateLocalVehicles: async (newArray) => {
        let oldArray = await vehiclesRepository.getAllVehicles();
        console.log(oldArray,"currentvehicles");

        let elementsToAdd = newArray.filter(elem => !oldArray.some(elem2 => elem.vin === elem2.vehicle_vin));
        console.log(elementsToAdd, "addRED");
        elementsToAdd.map(async (elem) => {await vehiclesRepository.insertVehicle([1, elem.vin, elem.stock, elem.year, elem.make, elem.model, elem.trim])});

        let elementsToDelete = oldArray.filter(elem => !newArray.some(elem2 => elem2.vin === elem.vehicle_vin));
        elementsToDelete.map(async (elem) => {await vehiclesRepository.deleteVehicleById([elem.vehicle_id])});
        console.log(elementsToDelete, "deleteRED");

        console.log(await vehiclesRepository.getAllVehicles(), "updated");
    },

    getAllVehiclesByDealershipId: async ([dealership_id]) => {
        return await vehiclesRepository.getAllVehiclesByDealerId([dealership_id]);
    }
    
}

// make: "Jeep"
// model: "Wrangler Unlimited"
// stock: "A13945"
// trim: "Sahara"
// vin: "1C4HJXEN0LW278766"
// year: "2020"

export { vehiclesService };