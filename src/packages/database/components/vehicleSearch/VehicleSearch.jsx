import { IonSearchbar, IonList, IonItem } from "@ionic/react";
import { useState, useEffect } from "react";
import { vehiclesService } from "../../features/services/vehiclesService";
import useDbRequest from "../../features/utils/databaseOperationsHook";
import { useAtom } from 'jotai';
import { user } from '../../../../services/user/user';

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


const VehicleSearch = () => {
    const dbRequest = useDbRequest();
    const [currentDealership] = useAtom(user.userSelectedDealership);
    const [searchText, setSearchText] = useState('');
    const [filteredVehicles,setFilteredVehicles] = useState(null);

    const getVehicleList = async (dealershipId) => {
        const response = await dbRequest.requestFunction(async()=>await vehiclesService.getAllVehiclesByDealershipId([dealershipId]));
        console.log(response,'rrr');
        setFilteredVehicles(response);
    }

    useEffect(() => {

        getVehicleList(currentDealership);
    }, []);

    useEffect(() => {
        (async()=>{
            const newFilter = await dbRequest.requestFunction(async()=>await vehiclesService.getAllVehiclesByVin([currentDealership,searchText]));
            setFilteredVehicles(newFilter);
            // console.log(newFilter,'newFilter');
        })()
        
    }, [searchText]);

    return (
        <>
            <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.target.value)} setClearButton="focus"></IonSearchbar>
            <IonList>
                { filteredVehicles && filteredVehicles?.map((vehicle,index) => (
                    <IonItem key={index}>{vehicle.vehicle_vin}</IonItem>
                ))}

            </IonList>
        </>
    )
}

export default VehicleSearch;