import { IonSearchbar, IonLabel, IonList } from "@ionic/react";
import { useState, useEffect, useRef } from "react";
import { vehiclesService } from "../../../../../packages/database/features/services/vehiclesService";
import { useRSelection } from "../../../../../packages/database/features/utils/utilityHooks";
import useDbRequest from "../../../../../packages/database/features/utils/databaseOperationsHook";
import VehicleSearchItem from "./VehicleSearchItem";
import './vehicleSearch.scss';

const VehicleSearch = ({ disableSave, newCar, scanResult }) => {
    const dbRequest = useDbRequest();
    const [, getCurrentSelection] = useRSelection();
    const [searchText, setSearchText] = useState('');
    const [filteredVehicles, setFilteredVehicles] = useState(null);
    const [spinnerOn, setSpinnerOn] = useState(true);
    const [allVehicles, setAllVehicles] = useState(null);
    const searchBar = useRef();

    useEffect(() => {
        (async () => {
            // const response = await dbRequest.requestFunction(async () => await vehiclesService.getAllVehiclesByDealershipId([getCurrentSelection().dealership_id]));
            // setAllVehicles(response);
            setSearchText(scanResult);
        })();
    }, []);

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

    const filterFunc = async () => {
        // if (allVehicles !== null) {
        //     const filtered = await Promise.all(allVehicles?.filter(vehicle => {
        //         return (vehicle.vehicle_vin)?.startsWith(searchText.toUpperCase()) || (vehicle.vehicle_stock)?.startsWith(searchText.toUpperCase());
        //     }));
        //     if (filtered.length === 1 && searchText.length === 17) {
        //         disableSave(false);
        //     }
        //     return filtered;
        // } else {
        //     return null;
        // }
    }

    const transformStringMatch = (string) => {
        //if string starts with searchText, return the string with the searchText in bold
        // if (searchText.length > 0) {
        //     if (string?.startsWith(searchText.toUpperCase())) {
        //         const stringArray = string.split(searchText.toUpperCase());
        //         return <>{stringArray[0]}<span className="matched" data-highlight={string}>{searchText.toUpperCase()}</span>{stringArray[1]}</>
        //     } else {
        //         return string;
        //     }
        // } else {
        //     return string;
        // }
    }

    const searcFieldCompletionHandler = async (e) => {
        // const target = e.target.closest('ion-item');
        // const attribute = target.querySelector('.matched').getAttribute('data-highlight');
        // setSearchText(attribute);
    }

    useEffect(() => {
        disableSave(true);
        (async () => {
            // if (searchText.length > 0) {
            //     const filteredList = await filterFunc();
            //     if (filteredList !== null) {
            //         setFilteredVehicles(filteredList);
            //         newCar(searchText);
            //     }
            //     if (searchText.length === 17) {
            //         disableSave(false);
            //     }
            // } else {
            //     setFilteredVehicles(null);
            // }
        })()
    }, [searchText]);

    useEffect(() => {
        setSearchText('');
    }, [getCurrentSelection().refreshPage]);

    return (
        <>
            <IonSearchbar
                value={searchText}
                ref={searchBar}
                debounce={1300}
                onIonChange={e => setSearchText(e.target.value)}
                setClearButton="focus"
            />

            <IonList >
                {filteredVehicles && filteredVehicles?.map((vehicle, index) => (
                    <VehicleSearchItem
                        key={index}
                        vehicle={vehicle}
                        match={transformStringMatch}
                        click={searcFieldCompletionHandler}
                    />
                ))}
                {(!spinnerOn && filteredVehicles?.length === 0) &&
                    <div className="ion-text-center">
                        <IonLabel>No results match this search</IonLabel>
                    </div>
                }
            </IonList>

            {/* <IonList>
        {items.map((item, index) => (
          <IonItem key={item}>
            <IonAvatar slot="start">
              <img src={'https://picsum.photos/80/80?random=' + index} alt="avatar" />
            </IonAvatar>
            <IonLabel>{item}</IonLabel>
          </IonItem>
        ))}
      </IonList>
      <IonInfiniteScroll
        onIonInfinite={(ev) => {
          generateItems();
          setTimeout(() => ev.target.complete(), 500);
        }}
      >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll> */}
        </>
    )
}

export default VehicleSearch;
