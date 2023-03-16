import { IonSearchbar, IonLabel, IonList, IonInfiniteScroll, IonInfiniteScrollContent, useIonAlert } from "@ionic/react";
import { useState, useEffect, useRef } from "react";
import { vehiclesService } from "../../../../../packages/database/features/services/vehiclesService";
import { useRSelection } from "../../../../../services/customHooks/utilityHooks";
import useDbRequest from "../../../../../packages/database/features/utils/databaseOperationsHook";
import VehicleSearchItem from "./VehicleSearchItem";
import { useHistory } from "react-router";
import './vehicleSearch.scss';
import useSaveVehicleAlert from "../saveAlert/saveVehicleAlert";
import {useLanguage} from "../../../../../packages/multiLanguage";

const VehicleSearch = ({ disableSave, newCar, scanResult }) => {
    const [translate] = useLanguage();
    const dbRequest = useDbRequest();
    const history = useHistory();
    const [setCurrentSelection, getCurrentSelection] = useRSelection();
    const [searchText, setSearchText] = useState('');
    const [filteredVehicles, setFilteredVehicles] = useState(null);
    // const [spinnerOn, setSpinnerOn] = useState(true);
    const searchBar = useRef();
    const refOffset = useRef(0);
    const [ openAlert ] = useSaveVehicleAlert();


    //*get search input value
    //*get 10 vehicles from db based on input value
    //*if input value is 17 characters long, check if it's a valid vin
    //*if it's a valid vin, enable save button
    //*on scroll down get next 10 vehicles from db based on input value
    //*if input value changed remove all vehicles from list and start from the beginning

    const getListOfVehicles = async (string) => {
        const listOfVehicles = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesByDealershipIdAndString([
            getCurrentSelection().dealership_id,
            string,
            refOffset.current]));
        setFilteredVehicles((prev) => [...prev, ...listOfVehicles]);
        refOffset.current += 10;
        console.log("listOfVehicles", listOfVehicles);
    };


    useEffect(() => {
        (async () => {
            if (searchText.length !== 0) {
                console.log("searchText called", searchText, searchText.length);
                await getListOfVehicles(searchText);
            }

            if (!validateVin(searchText)) {
                console.log("invalid vin", searchText);
                return
            }
            disableSave(false);
        })();
        console.log(searchText, searchText.length);

        return () => {
            refOffset.current = 0;
            setFilteredVehicles([]);
        }
    }, [searchText]);


    useEffect(() => {
        searchBar.current.value = scanResult;
    }, [scanResult]);


    function validateVin(vin) {
        return validate(vin);

        function transliterate(c) {
            return '0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ'.indexOf(c) % 10;
        }

        function get_check_digit(vin) {
            var map = '0123456789X';
            var weights = '8765432X098765432';
            var sum = 0;
            for (var i = 0; i < 17; ++i)
                sum += transliterate(vin[i]) * map.indexOf(weights[i]);
            return map[sum % 11];
        }

        function validate(vin) {
            if (vin.length !== 17) return false;
            return get_check_digit(vin) === vin[8];
        }
    }

    const searchFieldCompletionHandler =  async (vin) => {
        searchBar.current.value = vin;
        console.log("oldCar!!!", vin);
        newCar(vin);
        await openAlert(vin);
    }

    useEffect(() => {
        setSearchText('');
    }, [getCurrentSelection().refreshPage]);

    return (
        <>
            <IonSearchbar
                value={searchText}
                ref={searchBar}
                debounce={0}
                onIonChange={e => setSearchText(e.target.value)}
                setClearButton="focus"
                placeholder={translate("Search")}
            />

            <IonList >
                {filteredVehicles && filteredVehicles?.map((vehicle, index) => (
                    <VehicleSearchItem
                        key={index}
                        vehicle={vehicle}
                        match={searchText}
                        click={searchFieldCompletionHandler}
                    />
                ))}
                {/* {(!spinnerOn && filteredVehicles?.length === 0) &&
                    <div className="ion-text-center">
                        <IonLabel>No results match this search</IonLabel>
                    </div>
                } */}
            </IonList>
            <IonInfiniteScroll
                onIonInfinite={async (ev) => {
                    if (searchText.length !== 0) {
                        await getListOfVehicles(searchText);
                    }
                    setTimeout(() => ev.target.complete(), 500);

                }}
            >
                <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
            </IonInfiniteScroll>
        </>
    )
}

export default VehicleSearch;
