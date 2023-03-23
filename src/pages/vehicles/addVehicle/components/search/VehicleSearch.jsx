import { IonSearchbar, IonList, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";
import {useLanguage} from "../../../../../packages/multiLanguage";
import { useRef, useEffect } from "react";
import VehicleSearchItem from "./VehicleSearchItem";
import useVehicleSearch from "../../features/handleVehicleSearch";
import useRefreshPage from "../../../../../services/customHooks/refreshCurrentPageImproved";
import './vehicleSearch.scss';

const VehicleSearch = ({ disableSave, newCar, scanResult }) => {
    const { refreshPage } = useRefreshPage();
    const [translate] = useLanguage();
    const {
        filteredVehicles,
        setSearchText,
        searchText,
        validateVinHandler,
        searchFieldCompletionHandler,
        getListOfVehicles
    } = useVehicleSearch(disableSave);

    // useEffect(() => {
    //     setSearchText('');
    //     console.log('setting search text to empty string');
    // }, [getCurrentSelection().refreshPage]);

    return (
        <>
            <IonSearchbar
                value={searchText}
                onIonChange={e => {
                      setSearchText(e.target.value);
                }}
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
