import { Page, CustomHeader, CustomContent, CustomFooter } from "../../../components/page/Page";
import { IonButtons, IonTitle, IonButton, IonLabel, IonBackButton, IonIcon, IonSearchbar } from "@ionic/react";
import { useHistory } from "react-router";
import { useState } from "react";
import "./vehiclePhotos.scss";
import FooterAddVehicle from "../../../components/footers/FooterAddVehicle";

const VehiclePhotos = ({ photoType }) => {
    const [photosOfVehicle, setPhotosOfVehicle] = useState([]);
    return (
        <Page pageClass={'vehiclePhotos'}>
            <CustomHeader>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/dealerships" icon="assets/svgs/previous.svg"></IonBackButton>
                </IonButtons>
                <IonTitle className='ion-text-center'>{photoType} Capture</IonTitle>
            </CustomHeader>

            <CustomContent>
                {/* {!photosOfVehicle? */}
                <div className="centered-camera-button">
                    <IonButtons >
                        <IonButton><IonIcon icon='/assets/svgs/camera.svg'></IonIcon></IonButton>
                    </IonButtons>
                    <IonLabel>Start taking photos of your vehicle</IonLabel>

                </div>
                {/* :null */}
                {/* } */}
            </CustomContent>
            <FooterAddVehicle photoBtn={true} />
        </Page>
    )
}

export default VehiclePhotos