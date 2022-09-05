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
    deleteHotspotById:async ([hotspot_id]) =>{
        await hotspotsRepository.deleteHotspotById([hotspot_id]);
    },
    getAllHotspotsWithDealershipId:async ([dealership_id]) =>{
        return await hotspotsRepository.getAllHotspotsWithDealershipId([dealership_id]);
    },
    //delete all hotspots by dealership id
    deleteAllHotspotsByDealershipId:async ([dealership_id]) =>{
        const hotspots = await hotspotsRepository.getAllHotspotsWithDealershipId([dealership_id]);
        hotspots.map(async (hotspot) => {
            await hotspotsRepository.deleteHotspotById([hotspot.hotspot_id]);
        })
    }
}


export { hotspotsService };