import { IonBackButton, IonButtons, IonLabel, IonTitle, IonButton, IonIcon } from "@ionic/react";
import { Page, CustomHeader, CustomContent, CustomFooter } from "../../../components/page/Page";


const VehicleDetails = (props) => {

    return (
        <Page pageClass={'vehicleDetails'}>
            <CustomHeader>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/dealerships" icon="assets/svgs/previous.svg"></IonBackButton>
                </IonButtons>
                <IonTitle className='ion-text-center'>Vehicle</IonTitle>
            </CustomHeader>
            <CustomContent colSizesArr={[12,12,12,12]}>
                <>
                    <IonLabel>VIN / Stock Number</IonLabel>
                    <IonLabel>Stock Number Placeholder</IonLabel>
                </> 
                <IonButtons>
                    <IonButton>
                        <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon> 
                        <IonLabel>Interior</IonLabel>   
                    </IonButton>    
                </IonButtons>
                <IonButtons>
                    <IonButton>
                        <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon> 
                        <IonLabel>Individual</IonLabel>   
                    </IonButton>    
                </IonButtons><IonButtons>
                    <IonButton>
                        <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon> 
                        <IonLabel>Exterior</IonLabel>   
                    </IonButton>    
                </IonButtons>
            </CustomContent>
            <CustomFooter>
                <h1>Footer</h1>
            </CustomFooter>
        </Page>
    )
}

export default VehicleDetails;