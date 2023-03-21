import { useState, useRef } from 'react';
import { useDbRequest } from "../../../../packages/database";
import useSaveVehicleAlert from '../components/saveAlert/saveVehicleAlert';
import { useRSelection } from '../../../../services/customHooks/utilityHooks';
import {vehiclesService} from "../../../../packages/database";

const useVehicleSearch = (disableSave, newCar) => {
      const [ setCurrentSelection, getCurrentSelection ] = useRSelection();
      const [filteredVehicles, setFilteredVehicles] = useState(null);
      const [searchText, setSearchText] = useState('');
      const [openAlert] = useSaveVehicleAlert();
      const searchBarRef = useRef(null);
      const refOffset = useRef(0);
      const dbRequest = useDbRequest();
      const searchBar = useRef();
      const getListOfVehicles = async (string) => {
            const listOfVehicles = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesByDealershipIdAndString([
                  getCurrentSelection().dealership_id,
                  string,
                  refOffset.current]));
            setFilteredVehicles((prev) => [...prev, ...listOfVehicles]);
            refOffset.current += 10;
            console.log("listOfVehicles", listOfVehicles);
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

      const validateVinHandler = async() => {
            if (searchText.length !== 0) {
                  console.log("searchText called", searchText, searchText.length);
                  await getListOfVehicles(searchText);
            }

            if (!validateVin(searchText)) {
                  // console.log("invalid vin", searchText);
                  return
            }
            disableSave(false);
      }

      const searchFieldCompletionHandler =  async (vin) => {
            searchBar.current.value = vin;
            console.log("oldCar!!!", vin);
            newCar(vin);
            await openAlert(vin);
      }

      return{
            searchBarRef,
            filteredVehicles,
            setSearchText,
            searchText,
            validateVinHandler,
            searchFieldCompletionHandler,
            searchBar,
            getListOfVehicles
      }
}

export default useVehicleSearch;