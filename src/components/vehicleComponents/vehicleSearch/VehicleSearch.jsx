import { IonSearchbar, IonLabel, IonRadio, IonRadioGroup, IonVirtualScroll, IonGrid, IonContent, IonCol, IonRow, IonSpinner, IonList, IonItem, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";
import { useState, useEffect } from "react";
import { vehiclesService } from "../../../packages/database/features/services/vehiclesService";
import { useAtom } from 'jotai';
import { user } from '../../../services/user/user';
import useDbRequest from "../../../packages/database/features/utils/databaseOperationsHook";
import VehicleSearchItem from "./VehicleSearchItem";
import './vehicleSearch.scss';


const VehicleSearch = ({ disableSave, newCar }) => {
    const dbRequest = useDbRequest();
    const [currentDealership] = useAtom(user.userCurrentSelections);
    const [searchText, setSearchText] = useState('');
    const [filteredVehicles, setFilteredVehicles] = useState(null);
    const [spinnerOn, setSpinnerOn] = useState(true);
    const [allVehicles, setAllVehicles] = useState(null);
    // const [matchingVin, setMatchingVin] = useState(false);

    const getVehicleList = async (dealershipId) => {
        const response = await dbRequest.requestFunction(async () => await vehiclesService.getAllVehiclesByDealershipId([dealershipId]));
        setAllVehicles(response);
    }

    useEffect(() => {
        (async () => {
            await getVehicleList(currentDealership.dealership_id);
        })();
    }, []);

    const filterFunc = async () => {
        //filter all vehicles by search text where the search text matches the vin or the stock of the vehicle, do it asynchronously
        const filtered = await Promise.all(allVehicles?.filter(vehicle => {
            return (vehicle.vehicle_vin)?.startsWith(searchText.toUpperCase()) || (vehicle.vehicle_stock)?.startsWith(searchText.toUpperCase());
        }
        ));
        if (filtered.length < 2 && searchText.length > 0) {
            disableSave(false);
        }
        return filtered;
    }

    const transformStringMatch = (string) => {
        //if string starts with searchText, return the string with the searchText in bold
        if (searchText.length > 0) {
            if (string?.startsWith(searchText.toUpperCase())) {
                const stringArray = string.split(searchText.toUpperCase());
                return <>{stringArray[0]}<span className="matched" data-highlight={string}>{searchText.toUpperCase()}</span>{stringArray[1]}</>
            } else {
                return string;
            }
        } else {
            return string;
        }
    }

    const searcFieldCompletionHandler = async (e) => {
        const target = e.target.closest('ion-item');
        const attribute = target.querySelector('.matched').getAttribute('data-highlight');
        setSearchText(attribute);
    }

    useEffect(() => {
        disableSave(true);

        (async () => {
            if (searchText.length >= 3) {
                const filteredList = await filterFunc();
                setFilteredVehicles(filteredList);
                newCar(searchText);
            } else {
                setFilteredVehicles(null);
            }
        })()

    }, [searchText]);


    return (
        <>
            <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.target.value)} setClearButton="focus"></IonSearchbar>

            <IonList >
                {searchText.length < 3 && <div className="ion-text-center">Search by Vin or Stock number, write at least 3 characters to see the filtered vehicles</div>}
                {filteredVehicles && filteredVehicles?.map((vehicle, index) => (

                    <VehicleSearchItem key={index} vehicle={vehicle} match={transformStringMatch} click={searcFieldCompletionHandler}></VehicleSearchItem>
                ))}
                {(!spinnerOn && filteredVehicles?.length == 0) &&
                    <div className="ion-text-center">
                        <IonLabel>No results match this search</IonLabel>
                    </div>
                }
            </IonList>
        </>
    )
}

export default VehicleSearch;
