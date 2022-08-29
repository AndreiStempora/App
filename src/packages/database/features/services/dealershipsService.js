import { dealershipsRepository } from "../repositories/dealershipsRepository";
import { vehiclesService } from "./vehiclesService";

const dealershipsService = {

    //insert a new dealership
    insertDealership:async ([dealership_id, dealership_name, dealership_logo]) =>{
        await dealershipsRepository.insertDealership([dealership_id, dealership_name, dealership_logo]);
    },

    //get all dealerships
    getAllDealerships:async() =>{
        return await dealershipsRepository.getAllDealerships();
    },

    //get a dealership by id
    getDealershipById:async ([dealership_id]) =>{
        return await dealershipsRepository.getDealershipById([dealership_id]);
    },

    //delete a dealership
    deleteDealership:async ([dealership_id]) =>{
        await dealershipsRepository.deleteDealership([dealership_id]);
    },

    //update a dealership
    updateDealership:async ([dealership_id, dealership_name, dealership_logo]) =>{
        await dealershipsRepository.updateDealership([dealership_id, dealership_name, dealership_logo]);
    },

    //update local dealerships
    updateLocalDealerships:async (newArray) =>{
        let oldArray = await dealershipsRepository.getAllDealerships();
        console.log(oldArray,"currentElements");

        let elementsToAdd = newArray.filter(elem => !oldArray.some(elem2 => parseInt(elem.id) === elem2.dealership_id));
        // console.log(elementsToAdd, "add");
        elementsToAdd.map(async (elem) => {await dealershipsRepository.insertDealership([elem.id, elem.dealer, elem.logo])});

        let elementsToDelete = oldArray.filter(elem => !newArray.some(elem2 => parseInt(elem2.id) === elem.dealership_id));
        elementsToDelete.map(async (elem) => {await dealershipsRepository.deleteDealership([elem.dealership_id])});
        // console.log(elementsToDelete, "delete");

        console.log(await dealershipsRepository.getAllDealerships(), "updated");
    },

    // deleteDealershipByIdAndVehicles:async ([dealership_id]) =>{
    //     // await vehiclesService.getAllVehiclesByDealershipId([dealership_id]).then((vehicles) => {
    //     //     vehicles.map(async (vehicle) => {
    //     //         await vehiclesService.deleteVehicleById([vehicle.vehicle_id]);
    //     //         }).then(async () => {
    //     //             await dealershipsRepository.deleteDealership([dealership_id]);
    //     //         })
    //     // })

    // }

}

export { dealershipsService };