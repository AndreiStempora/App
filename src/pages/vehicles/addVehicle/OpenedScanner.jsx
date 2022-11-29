import CustomHeader from "../../../components/page/pageMainComponents/CustomHeader";
import "./openedScanner.scss";
import { IonButton, IonButtons, IonTitle } from "@ionic/react";

const OpenedScanner = ({ close }) => {

    const closeScan = async () => {
        close();
    }
    return (
        <CustomHeader>
            <IonButtons slot="start">
                <IonButton onClick={closeScan}>X</IonButton>
            </IonButtons>
            <IonTitle className='ion-text-center'>SCAN</IonTitle>
        </CustomHeader>
    )
}

export default OpenedScanner