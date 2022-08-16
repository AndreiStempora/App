import { IonSearchbar } from "@ionic/react";
import { useState, useEffect } from "react";
import { vehiclesService } from "../../features/services/vehiclesService";
import useDbRequest from "../../features/utils/databaseOperationsHook";
import { useAtom } from 'jotai';
import { user } from '../../../../services/user/user';


const VehicleSearch = () => {
    const dbRequest = useDbRequest();
    const [currentDealership] = useAtom(user.userSelectedDealership);
    const [searchText, setSearchText] = useState('');
    const [filteredVehicles,setFilteredVehicles] = useState(null);

    const getVehicleList = async (dealershipId) => {
        const response = await dbRequest.requestFunction(()=>vehiclesService.getAllVehiclesByDealershipId([dealershipId]));
        setFilteredVehicles(response);
    }
    useEffect(() => {
        console.log(currentDealership);
        getVehicleList(currentDealership);
    }, []);

    useEffect(() => {
        console.log(searchText);
        console.log(filteredVehicles);
        
    }, [searchText]);

    return (
        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.target.value)} setClearButton="focus"></IonSearchbar>
    )
}

export default VehicleSearch;