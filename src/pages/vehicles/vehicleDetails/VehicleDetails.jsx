import { IonBackButton, IonButtons, IonLabel, IonTitle, IonButton, IonIcon } from "@ionic/react";
import FooterAddVehicle from "../../../components/footers/FooterAddVehicle";
import { Page, CustomHeader, CustomContent, CustomFooter } from "../../../components/page/Page";
import { useHistory } from "react-router";
import './vehicleDetails.scss';

const VehicleDetails = (props) => {
    const history = useHistory();

    const goToPhotosHandler = () => {
        history.push('/vehicle-photos');
    }

    return (
        <Page pageClass={'vehicleDetails'}>
            <CustomHeader>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/dealerships" icon="assets/svgs/previous.svg"></IonBackButton>
                </IonButtons>
                <IonTitle className='ion-text-center'>Vehicle</IonTitle>
            </CustomHeader>
            <CustomContent colSizesArr={[12, 12]}>
                <>
                    <IonLabel>VIN / Stock Number</IonLabel>
                    <IonLabel>Stock Number Placeholder</IonLabel>
                </>
                <>
                    <IonButtons className="camera-buttons">
                        <IonButton onClick={goToPhotosHandler}>
                            <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon>
                            <IonLabel>Interior</IonLabel>
                        </IonButton>
                        <IonButton onClick={goToPhotosHandler}>
                            <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon>
                            <IonLabel>Individual</IonLabel>
                        </IonButton>
                        <IonButton onClick={goToPhotosHandler}>
                            <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon>
                            <IonLabel>Exterior</IonLabel>
                        </IonButton>
                    </IonButtons>
                    <div className="car-image">
                        <img src="/assets/img/car-outline.png" alt="car placeholder" />
                    </div>
                </>
            </CustomContent>
            <FooterAddVehicle />
        </Page>
    )
}

export default VehicleDetails;