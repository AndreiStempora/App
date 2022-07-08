import { hotspotsRepository } from "../repositories/hotspotsRepository";

const hotspotsService = {
    //insert a new hotspot
    insertHotspot:async ([dealership_id,hotspot_name]) =>{
        await hotspotsRepository.insertHotspot([dealership_id,hotspot_name]);
    },
    //get all hotspots
    getAllHotspots:async () =>{
        return await hotspotsRepository.getAllHotspots();
    },
    //delete a hotspot by id
    deleteHotspot:async ([hotspot_id]) =>{
        await hotspotsRepository.deleteHotspot([hotspot_id]);
    },

}


export { hotspotsService };