import { IonSearchbar, IonList, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";
import {useLanguage} from "../../../../../packages/multiLanguage";
import { useEffect } from "react";
import VehicleSearchItem from "./VehicleSearchItem";
import useVehicleSearch from "../../features/handleVehicleSearch";
import useRefreshPage from "../../../../../services/customHooks/refreshCurrentPageImproved";
import './vehicleSearch.scss';

const VehicleSearch = ({ disableSave, newCar, scanResult }) => {
    const { refreshPage } = useRefreshPage();
    const [translate] = useLanguage();

    const { searchBarRef,
        filteredVehicles,
        setSearchText,
        searchText,
        validateVinHandler,
        searchFieldCompletionHandler,
        searchBar,
        getListOfVehicles
    } = useVehicleSearch(disableSave, newCar);

    useEffect(() => {
        (async () => {
            await validateVinHandler();
        })();
        // console.log(searchText, searchText.length);

        return () => {
            // refOffset.current = 0;
            // setFilteredVehicles([]);
        }
    }, [searchText]);


    useEffect(() => {
        searchBar.current.value = scanResult;
    }, [scanResult]);






    // useEffect(() => {
    //     setSearchText('');
    //     console.log('setting search text to empty string');
    // }, [getCurrentSelection().refreshPage]);

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
