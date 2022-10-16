import { Page, CustomHeader, CustomContent, CustomFooter } from "../../../components/page/Page"
import { IonButtons, IonTitle, IonButton,IonLabel, IonIcon, IonSearchbar } from "@ionic/react"
import { useHistory } from "react-router";
import "./addVehicle.scss"

const AddVehicle = () => {
    const history = useHistory();

    const backToSelectVehiclesHandler = () => {
        history.push("/vehicle-search");
    }

    return (
        <Page pageClass={'addVehicle'}>
            <CustomHeader>
                <IonButtons slot="start">
                    <IonButton className='ion-text-capitalize' onClick={backToSelectVehiclesHandler}>cancel</IonButton>
                </IonButtons>
                    <IonTitle className='ion-text-center'>Add vehicle</IonTitle>
                <IonButtons slot="end">
                    <IonButton className='ion-text-capitalize'>Save</IonButton>
                </IonButtons>
            </CustomHeader>

            <CustomContent colSizesArr={[12]} >
                <IonButtons className="ion-justify-content-between">
                <IonLabel>VIN / Stock number
                </IonLabel>
                    <IonButton className="ion-text-right"><IonIcon icon={'./assets/svgs/scanner.svg'}></IonIcon></IonButton>

                </IonButtons>
                <IonSearchbar></IonSearchbar>
                <IonButtons className="ion-justify-content-center">
                    <IonButton onClick={()=>{history.push('/vehicle-details')}}>go to vehicle details</IonButton>
                </IonButtons>
            </CustomContent>

            {/* <CustomFooter>
                <h1>Footer</h1>
            </CustomFooter> */}
        </Page>
    )
}

export default AddVehicle