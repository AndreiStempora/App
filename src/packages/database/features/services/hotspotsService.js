import { hotspotsRepository } from "../repositories/hotspotsRepository";

const hotspotsService = {
    //insert a new hotspot
    insertHotspot:async ([dealership_id,hotspot_name, hotspot_type]) =>{
        await hotspotsRepository.insertHotspot([dealership_id,hotspot_name, hotspot_type]);
    },
    //get all hotspots
    getAllHotspots:async () =>{
        return await hotspotsRepository.getAllHotspots();
    },
    //delete a hotspot by id
    deleteHotspotById:async ([hotspot_id]) =>{
        await hotspotsRepository.deleteHotspotById([hotspot_id]);
    },
    getAllHotspotsByDealershipId:async ([dealership_id]) =>{
        return await hotspotsRepository.getAllHotspotsByDealershipId([dealership_id]);
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