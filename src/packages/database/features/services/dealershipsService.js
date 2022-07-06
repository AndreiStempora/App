import { dealershipsRepository } from "../repositories/dealershipsRepository";

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
    }
}

export { dealershipsService };