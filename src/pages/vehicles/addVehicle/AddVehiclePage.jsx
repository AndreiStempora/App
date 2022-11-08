import { Page, CustomHeader, CustomContent, CustomFooter } from "../../../components/page/Page"
import { IonButtons, IonTitle, IonButton, IonLabel, IonIcon, IonSearchbar, IonToolbar } from "@ionic/react"
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { useDbRequest, vehiclesService, hotspotsService } from "../../../packages/database";
import VehicleSearch from "../../../components/vehicleComponents/vehicleSearch/VehicleSearch";
import "./addVehicle.scss"
import { useRSelection } from "../../../packages/database/features/utils/utilityHooks";

const AddVehicle = () => {
    const history = useHistory();
    const dbRequest = useDbRequest();
    const [newCar, setNewCar] = useState('');
    const [setCurrentSelection, getCurrentSelection] = useRSelection;
    const [disabledSave, setDisabledSave] = useState(true);

    const backToSelectVehiclesHandler = () => {
        history.push("/vehicle-search");
    }

    const extractIdAndUpdate = async (vehicle) => {
        await dbRequest.requestFunction(async () => await vehiclesService.updateVehicleById([vehicle.vehicle_id, 1, 1]));
    }

    const searchInDbForVehicle = async (keyword) => {
        const vinCar = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleByVin([keyword]));

        if (vinCar === undefined) {
            const stockCar = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleByStock([keyword]));
            if (stockCar === undefined) {
                await dbRequest.requestFunction(async () => await vehiclesService.addVehicle([getCurrentSelection().dealership_id, keyword, 1, 1]));
            } else {
                await extractIdAndUpdate(stockCar);
            }
        } else {
            await extractIdAndUpdate(vinCar);
        }

    }

    const saveVehicleHandler = async (e) => {
        await searchInDbForVehicle(newCar);
        history.push("/vehicle-search");
    }

    useEffect(() => {

    }, [disabledSave]);

    return (
        <Page pageClass={'addVehicle'}>
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

            <CustomContent colSizesArr={[[12],[12]]} >
                <>
                    <IonButtons className="ion-justify-content-between">
                        <IonLabel>VIN / Stock number</IonLabel>
                        <IonButton className="ion-text-right"><IonIcon icon={'./assets/svgs/scanner.svg'}></IonIcon></IonButton>
                    </IonButtons>
                    <VehicleSearch newCar={setNewCar} disableSave={setDisabledSave}></VehicleSearch>
                </>
                    <IonButtons className="ion-justify-content-center">
                        <IonButton onClick={() => { history.push('/vehicle-details') }}>go to vehicle details</IonButton>
                    </IonButtons>
            </CustomContent>
        </Page>
    )
}

export default AddVehicle