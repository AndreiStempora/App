import { IonSearchbar, IonLabel, IonRadio, IonRadioGroup, IonVirtualScroll, IonGrid, IonContent, IonCol, IonRow, IonSpinner, IonList, IonItem, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";
import { useState, useEffect } from "react";
import { vehiclesService } from "../../features/services/vehiclesService";
import useDbRequest from "../../features/utils/databaseOperationsHook";
import { useAtom } from 'jotai';
import { user } from '../../../../services/user/user';
import './vehicleSearch.scss';


const VehicleSearch = () => {
    const dbRequest = useDbRequest();
    const [currentDealership] = useAtom(user.userSelectedDealership);
    const [searchText, setSearchText] = useState('');
    const [filteredVehicles, setFilteredVehicles] = useState(null);
    const [spinnerOn, setSpinnerOn] = useState(true);
    const [allVehicles, setAllVehicles] = useState(null);

    const getVehicleList = async (dealershipId) => {
        const response = await dbRequest.requestFunction(async () => await vehiclesService.getAllVehiclesByDealershipId([dealershipId]));
        setAllVehicles(response);
    }

    useEffect(() => {
        getVehicleList(currentDealership);
    }, []);

    const filterFunc = async () => {
        //filter all vehicles by search text where the search text matches the vin or the stock of the vehicle, do it asynchronously
        const filtered = await Promise.all(allVehicles.filter(vehicle => 
            vehicle.vehicle_vin.startsWith(searchText.toUpperCase()) || vehicle.vehicle_stock.startsWith(searchText.toUpperCase())));
        return filtered;
    }

    const transformStringMatch = (string) => {
        //if string starts with searchText, return the string with the searchText in bold
        if(searchText.length > 0){
            if (string.startsWith(searchText.toUpperCase())) {
                const stringArray = string.split(searchText.toUpperCase());
                return <>{stringArray[0]}<span className="matched">{searchText.toUpperCase()}</span>{stringArray[1]}</>
            } else {
                return string;
            }
        } else {
            return string;
        }
    }

    useEffect(() => {
        (async () => {
            if(searchText.length > 0){
                const filteredList = await filterFunc();
                console.log(filteredList);
                setFilteredVehicles(filteredList);
            } else {
                setFilteredVehicles(null);
            }
        })()

    }, [searchText]);

    return (
        <>
            <IonContent className="search-content">
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.target.value)} setClearButton="focus"></IonSearchbar>
                        </IonCol>
                        <IonCol className="inner-scroll scroll-y" size="12">

                            <IonList >
                                {searchText.length == 0 && <div className="ion-text-center">Search by Vin or Stock number</div>}
                                {filteredVehicles && filteredVehicles?.map((vehicle, index) => (
                                    <IonItem key={index} className='search-result-element'>
                                        <IonLabel>
                                            <div className="element-name">
                                                {vehicle.vehicle_make} {vehicle.vehicle_model} {vehicle.vehicle_trim}
                                            </div>
                                            <div className="element-search">
                                                <span className="element-vin">
                                                    <span className="name">
                                                        Vin:
                                                    </span>
                                                    <span className="value">
                                                        {transformStringMatch(vehicle.vehicle_vin)}
                                                    </span>
                                                </span>
                                                <span className="element-stock">
                                                <span className="name">
                                                        Stock:
                                                    </span>
                                                    <span className="value">
                                                        {transformStringMatch(vehicle.vehicle_stock)}
                                                    </span>
                                                </span>
                                            </div>
                                        </IonLabel>
                                    </IonItem>
                                ))}
                                {(!spinnerOn && filteredVehicles?.length == 0) &&
                                    <div className="ion-text-center">
                                        <IonLabel>No results match this search</IonLabel>
                                    </div>
                                }
                            </IonList>

                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    )
}

export default VehicleSearch;
