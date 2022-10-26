import { Page, CustomHeader, CustomContent, CustomFooter } from "../../../components/page/Page"
import { IonButtons, IonTitle, IonButton,IonLabel, IonIcon, IonSearchbar, IonToolbar } from "@ionic/react"
import { useHistory } from "react-router";
import { useState } from "react";
import VehicleSearch from "../../../components/vehicleComponents/vehicleSearch/VehicleSearch";
import "./addVehicle.scss"

const AddVehicle = () => {
    const history = useHistory();
    const [disabledSave, setDisabledSave] = useState(true);

    const backToSelectVehiclesHandler = () => {
        history.push("/vehicle-search");
    }

    const saveVehicleHandler = () => {
        
    }

    return (
        <Page pageClass={'addVehicle'}>
            <CustomHeader>
                <IonButtons slot="start">
                    <IonButton className='ion-text-capitalize' onClick={backToSelectVehiclesHandler}>cancel</IonButton>
                </IonButtons>
                    <IonTitle className='ion-text-center'>Add vehicle</IonTitle>
                <IonButtons slot="end">
                    <IonButton disabled={disabledSave} className='ion-text-capitalize'>Save</IonButton>
                </IonButtons>
            </CustomHeader>

            <CustomContent colSizesArr={[12]} >
                <IonButtons className="ion-justify-content-between">
                <IonLabel>VIN / Stock number
                </IonLabel>
                    <IonButton className="ion-text-right"><IonIcon icon={'./assets/svgs/scanner.svg'}></IonIcon></IonButton>
                </IonButtons>
                <VehicleSearch disableSave={setDisabledSave}></VehicleSearch>
                <IonButtons className="ion-justify-content-center">
                    <IonButton onClick={()=>{history.push('/vehicle-details')}}>go to vehicle details</IonButton>
                </IonButtons>
            </CustomContent>

        </Page>
    )
}

export default AddVehicle