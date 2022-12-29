import { Page, CustomHeader, CustomContent, CustomFooter } from "../../../components/page/Page"
import { IonButtons, IonTitle, IonButton, IonLabel, IonIcon, IonSearchbar, IonToolbar } from "@ionic/react"
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { useDbRequest, vehiclesService, hotspotsService } from "../../../packages/database";
import VehicleSearch from "./vehicleSearch/VehicleSearch";
import "./addVehicle.scss"
import { useRSelection } from "../../../packages/database/features/utils/utilityHooks";
import OpenedScanner from "./OpenedScanner";
import useBarcodeScanner from "../../../packages/barcodeScanner/features/barcodeScanner";

const AddVehicle = () => {
    const history = useHistory();
    const dbRequest = useDbRequest();
    const [newCar, setNewCar] = useState('');
    const [, getCurrentSelection] = useRSelection();
    const [disabledSave, setDisabledSave] = useState(true);
    const [hidePageContent, setHidePageContent] = useState(false);
    const scanner = useBarcodeScanner();
    const [scanResult, setScanResult] = useState('');

    const backToSelectVehiclesHandler = () => {
        history.push("/vehicle-search");
        //from string remove text starting with last slash
        // const path = history.location.pathname.replace(/\/[^\/]*$/, '');
        // history.push({ pathname: `${path}` });
    }

    const saveVehicleHandler = async (e) => {
        await searchInDbForVehicle(newCar);
        const path = history.location.pathname.replace(/\/[^\/]*$/, '');
        history.push({ pathname: `/vehicle-search`, state: { newCar } });

        // history.push("/vehicle-search");
    }

    const extractIdAndUpdate = async (vehicle) => {
        await dbRequest.requestFunction(async () => await vehiclesService.updateVehicleById([vehicle.vehicle_id, 1, 1]));
    }

    const searchInDbForVehicle = async (keyword) => {
        const vinCar = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleByVin([keyword]));

        if (vinCar === undefined) {
            const stockCar = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleByStock([keyword]));
            if (stockCar === undefined) {
                return await dbRequest.requestFunction(async () => await vehiclesService.addVehicle([getCurrentSelection().dealership_id, keyword, 1, 1]));
            } else {
                return await extractIdAndUpdate(stockCar);
            }
        } else {
            return await extractIdAndUpdate(vinCar);
        }
    }

    const openScannerHandler = async () => {
        setHidePageContent(true);
        let result = await scanner.startScan();
        console.log('result', result, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        setNewCar(result);
        setScanResult(result);
    }

    const closeScannerHandler = async () => {
        setHidePageContent(false);
        await scanner.stopScan();
    }

    useEffect(() => {
        // console.log('scanResult', scanResult);
        setHidePageContent(false);
    }, [scanResult]);



    useEffect(() => {

    }, [disabledSave]);

    return (
        <Page pageClass={`addVehicle ${hidePageContent ? 'camera-open' : ''}`}>
            {!hidePageContent ?
                (
                    <>
                        <CustomHeader>
                            <IonButtons slot="start">
                                <IonButton
                                    className='ion-text-capitalize'
                                    onClick={backToSelectVehiclesHandler}
                                >cancel</IonButton>
                            </IonButtons>
                            <IonTitle className='ion-text-center'>Add vehicle</IonTitle>
                            <IonButtons slot="end">
                                <IonButton
                                    className='ion-text-capitalize'
                                    disabled={disabledSave}
                                    onClick={saveVehicleHandler}
                                >Save</IonButton>
                            </IonButtons>
                        </CustomHeader>

                        <CustomContent colSizesArr={[[12], [12]]} >
                            <>
                                <IonButtons className="ion-justify-content-between">
                                    <IonLabel>VIN / Stock number</IonLabel>
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