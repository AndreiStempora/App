import { Page, CustomHeader, CustomContent } from "../../../../components/page/Page"
import { IonButtons, IonTitle, IonButton, IonLabel, IonIcon, useIonAlert } from "@ionic/react"
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { useDbRequest, vehiclesService } from "../../../../packages/database";
import VehicleSearch from "../components/search/VehicleSearch";
import "./addVehiclePage.scss"
import { useRSelection } from "../../../../services/customHooks/utilityHooks";
import OpenedScanner from "../components/scanner/OpenedScanner";
import useBarcodeScanner from "../../../../packages/barcodeScanner/features/barcodeScanner";
import useSaveVehicleAlert from "../components/saveAlert/saveVehicleAlert";
import useRefreshCurrentPage from "../../../../services/customHooks/RefreshCurrentPage";

const AddVehicle = () => {
    const history = useHistory();
    const dbRequest = useDbRequest();
    const [newCar, setNewCar] = useState('');
    const [setCurrentSelection, getCurrentSelection] = useRSelection();
    const [disabledSave, setDisabledSave] = useState(true);
    const [hidePageContent, setHidePageContent] = useState(false);
    const scanner = useBarcodeScanner();
    const [scanResult, setScanResult] = useState('');
    const [openAlert] = useSaveVehicleAlert();
    const { refreshPage } = useRefreshCurrentPage();

    useEffect(() => {
            refreshPage(history, '/vehicle-search', async () => {
                setScanResult('');
            })
    }, [history.location.pathname])
    const backToSelectVehiclesHandler = () => {
        history.push("/vehicle-search");
    }

    const saveVehicleHandler = async () => {
        console.log('newCar!!!', newCar)
        await openAlert(newCar);
    }

    const extractIdAndUpdate = async (vehicle) => {
        await dbRequest.requestFunction(async () => await vehiclesService.updateVehicleById([vehicle.vehicle_id, 1, 1]));
    }

    // const searchInDbForVehicle = async (keyword) => {
    //     const vinCar = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleByVin([keyword]));
    //
    //     console.log('vinCar', vinCar)
    //     if (vinCar === undefined) {
    //         const stockCar = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleByStock([keyword]));
    //         if (stockCar === undefined) {
    //             await dbRequest.requestFunction(async () => await vehiclesService.addVehicle([getCurrentSelection().dealership_id, keyword, 1, 1]));
    //             const vehiclesWithPics = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesWithPics([getCurrentSelection().dealership_id]));
    //             console.log('vehiclesWithPics', vehiclesWithPics)
    //             setCurrentSelection({vehicle_id: vehiclesWithPics[vehiclesWithPics.length - 1].vehicle_id});
    //
    //         } else {
    //             return await extractIdAndUpdate(stockCar);
    //         }
    //     } else {
    //         setCurrentSelection({vehicle_id: vinCar.vehicle_id});
    //         return await extractIdAndUpdate(vinCar);
    //     }
    // }

    const openScannerHandler = async () => {
        setHidePageContent(true);

        let result = await scanner.startScan();
    
        // if result is longer than 17 characters, remove first character
        if (result.length > 17) {
            result = result.slice(1);
        }
        setScanResult(result);
        setNewCar(result);
    }

    const closeScannerHandler = async () => {
        setHidePageContent(false);
        setScanResult('');
        await scanner.stopScan();
    }

    useEffect(() => {
        setHidePageContent(false);
    }, [scanResult]);

    return (
        <Page pageClass={`addVehicle ${hidePageContent ? 'camera-open' : ''}`}>
            {!hidePageContent ?
                (
                    <>
                        <CustomHeader>
                            <IonButtons slot="start">
                                <IonButton
                                    className='ion-text-capitalize blue'
                                    onClick={backToSelectVehiclesHandler}
                                >cancel</IonButton>
                            </IonButtons>
                            <IonTitle className='ion-text-center'>Add vehicle</IonTitle>
                            <IonButtons slot="end">
                                <IonButton
                                    className='ion-text-capitalize blue'
                                    disabled={disabledSave}
                                    onClick={saveVehicleHandler}
                                >Save</IonButton>
                            </IonButtons>
                        </CustomHeader>

                        <CustomContent colSizesArr={[[12], [12]]} >
                            <>
                                <IonButtons className="ion-justify-content-between">
                                    <IonLabel>VIN number</IonLabel>
                                    <IonButton
                                        onClick={openScannerHandler}
                                        className="ion-text-right"
                                    >
                                        <IonIcon icon={'./assets/svgs/scanner.svg'}></IonIcon>
                                    </IonButton>
                                </IonButtons>
                                <VehicleSearch newCar={setNewCar} disableSave={setDisabledSave} scanResult={scanResult}></VehicleSearch>
                            </>
                            <IonButtons className="ion-justify-content-center">
                                {/* <IonButton onClick={() => { history.push('/vehicle-details') }}>go to vehicle details</IonButton> */}
                            </IonButtons>
                        </CustomContent>
                    </>
                ) : (
                    <OpenedScanner close={closeScannerHandler}></OpenedScanner>)}
        </Page>
    )
}

export default AddVehicle