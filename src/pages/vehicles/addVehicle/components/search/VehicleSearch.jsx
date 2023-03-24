import { IonSearchbar, IonList, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";
import {useLanguage} from "../../../../../packages/multiLanguage";
import VehicleSearchItem from "./VehicleSearchItem";
import useVehicleSearch from "../../features/handleVehicleSearch";

import './vehicleSearch.scss';

const VehicleSearch = ({ disableSave,scanResult, searchText, setSearchText }) => {

    // const { refreshPage } = useRefreshPage();
    const [translate] = useLanguage();
    const {
        filteredVehicles,
        validateVinHandler,
        searchFieldCompletionHandler,
        getListOfVehicles
    } = useVehicleSearch(disableSave, searchText, setSearchText);

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
