import {useState, useRef, useEffect} from 'react';
import {useDbRequest} from "../../../../packages/database";
import useSaveVehicleAlert from '../components/saveAlert/saveVehicleAlert';
import {useRSelection} from '../../../../services/customHooks/utilityHooks';
import {vehiclesService} from "../../../../packages/database";

const useVehicleSearch = (disableSave) => {
      const [setCurrentSelection, getCurrentSelection] = useRSelection();
      const [filteredVehicles, setFilteredVehicles] = useState([]);
      const [searchText, setSearchText] = useState('');
      const [openAlert] = useSaveVehicleAlert();
      const refOffset = useRef(0);
      const dbRequest = useDbRequest();
      // const searchBar = useRef();
      const getListOfVehicles = async (string) => {
            const listOfVehicles = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesByDealershipIdAndString([
                  getCurrentSelection().dealership_id,
                  string,
                  refOffset.current
            ]));

            setFilteredVehicles((prev) => [...prev, ...listOfVehicles]);
            refOffset.current += 10;
            // console.log("listOfVehicles", listOfVehicles, refOffset.current, filteredVehicles);
      };

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

      const validateVinHandler = async () => {
            if (searchText.length !== 0) {
                  await getListOfVehicles(searchText);
            }
            if (validateVin(searchText)) {
                  disableSave(false);
            }
      }

      const searchFieldCompletionHandler = async (vin) => {
            setSearchText(vin);
            // searchBar.current.value = vin;
            // console.log("oldCar!!!", vin);
            // newCar(vin);
            await openAlert(vin);
      }

      useEffect(() => {

            (async () => {
                  await validateVinHandler();
            })();
            return () => {
                  refOffset.current = 0;
                  setFilteredVehicles([]);
            }

      }, [searchText]);

      return {
            filteredVehicles,
            setSearchText,
            searchText,
            validateVinHandler,
            searchFieldCompletionHandler,
            getListOfVehicles
      }
}

export default useVehicleSearch;