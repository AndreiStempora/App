import { dealershipsRepository } from "../repositories/dealershipsRepository";

const dealershipsService = {

    //insert a new dealership
    insertDealership:([dealership_id, dealership_name, dealership_logo]) =>{
        dealershipsRepository.insertDealership([dealership_id, dealership_name, dealership_logo]);
    },

    //get all dealerships
    getAllDealerships:() =>{
       dealershipsRepository.getAllDealerships();
    },

    //get a dealership by id
    getDealershipById:([dealership_id]) =>{
        dealershipsRepository.getDealershipById([dealership_id]);
    },

    //delete a dealership
    deleteDealership:([dealership_id]) =>{
        dealershipsRepository.deleteDealership([dealership_id]);
    },

    //update a dealership
    updateDealership:([dealership_id, dealership_name, dealership_logo]) =>{
        dealershipsRepository.updateDealership([dealership_id, dealership_name, dealership_logo]);
    }
}

export { dealershipsService };