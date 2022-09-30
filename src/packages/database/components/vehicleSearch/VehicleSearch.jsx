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

    const filterFunc =async ()=> {
        const startTime = new Date().getTime();
        if (searchText.length > 0) {
            const filteredVehicles = await allVehicles.filter((vehicle) => {
                return vehicle.vehicle_vin.toLowerCase().startsWith(searchText.toLowerCase());
            });
            setFilteredVehicles(filteredVehicles);
        } else {
            setFilteredVehicles(null);
        }
        
        const finishTime = new Date().getTime();
        console.log(finishTime - startTime, 'timeFilter');
    }

    useEffect(() => {
        (async () => {
            const startTime = new Date().getTime();
            setSpinnerOn(true);
            const newFilter = await dbRequest.requestFunction(async () => await vehiclesService.getAllVehiclesByVin([currentDealership, searchText]));
            setFilteredVehicles(newFilter);
            // console.log(newFilter, 'newFilter');
            // console.log(filteredVehicles, searchText, 'filteredVehicles');
            setSpinnerOn(false);
            const finishTime = new Date().getTime();
            console.log(finishTime - startTime, 'timeDB');
            return true
        })().then((el) => {
            filterFunc();
        })

    }, [searchText]);

    return (
        <>
            <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.target.value)} setClearButton="focus"></IonSearchbar>
            <IonContent className="search-content">
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonList>
                                <IonRadioGroup>
                                    <IonRow>
                                        <IonCol size="6">
                                            <IonItem>
                                                <IonRadio color='danger' slot="start" value={'red'}></IonRadio>
                                                <IonLabel>Red</IonLabel>
                                            </IonItem>
                                        </IonCol>
                                        <IonCol size="6">
                                            <IonItem>
                                                <IonRadio slot="start" value={'blue'}></IonRadio>
                                                <IonLabel>blue</IonLabel>
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>
                                </IonRadioGroup>
                            </IonList>
                        </IonCol>
                        <IonCol className="inner-scroll scroll-y" size="12">
                            <IonList >
                                {spinnerOn &&
                                    <div className="ion-text-center">
                                        <IonLabel>Loading Data
                                            <IonSpinner name="lines" text="loading" />
                                        </IonLabel>
                                    </div>
                                }
                                {(!spinnerOn && filteredVehicles) && filteredVehicles?.map((vehicle, index) => (
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
                                                        {vehicle.vehicle_vin}
                                                    </span>
                                                </span>
                                                <span className="element-stock">
                                                <span className="name">
                                                        Stock:
                                                    </span>
                                                    <span className="value">
                                                        {vehicle.vehicle_stock}
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