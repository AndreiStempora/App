import {useEffect, useRef, useState} from "react";
import {useBarcodeScanner} from "../../../../packages/barcodeScanner";
import useSaveVehicleAlert from "../components/saveAlert/saveVehicleAlert";
import {useHistory} from "react-router";

const useAddVehiclePage = () => {
      const scanner = useBarcodeScanner();
      const history = useHistory();
      const [hidePageContent, setHidePageContent] = useState(false);
      // const [scanResult, setScanResult] = useState('');
      const scanResultRef = useRef('');
      const [disabledSave, setDisabledSave] = useState(true);
      // const [newCar, setNewCar] = useState('');
      const [openAlert] = useSaveVehicleAlert();

      const backToSelectVehiclesHandler = () => {
            history.push("/vehicle-search");
      }

      const saveVehicleHandler = async () => {
            // console.log('newCar!!!', newCar)
            // await openAlert(newCar);
      }
      const openScannerHandler = async () => {
            setHidePageContent(true);
            let result = await scanner.startScan();
            // if result is longer than 17 characters, remove first character
            if (result.length > 17) {
                  result = result.slice(1);
            }
            scanResultRef.current = result;
            // setNewCar(result);
            setDisabledSave(false);
            setHidePageContent(false);
      }

      const closeScannerHandler = async () => {
            await scanner.stopScan();
            // setScanResult('');
            setHidePageContent(false);
      }

      // useEffect(() => {
      //       setHidePageContent(false);
      // }, [scanResult]);


      return {
            // setScanResult,
            hidePageContent,
            backToSelectVehiclesHandler,
            disabledSave,
            saveVehicleHandler,
            openScannerHandler,
            // setNewCar,
            setDisabledSave,
            // scanResult,
            closeScannerHandler
      }
}

export default useAddVehiclePage