import CustomHeader from "../../../components/page/pageMainComponents/CustomHeader";
import "./openedScanner.scss";
import { IonButton, IonButtons, IonTitle } from "@ionic/react";
import { CustomContent } from "../../../components/page/Page";

const OpenedScanner = ({ close }) => {

    const closeScan = async () => {
        close();
    }
    return (
        <>
            {/* <CustomHeader>
                <IonButtons slot="start">
                    <IonButton onClick={closeScan}>X</IonButton>
                </IonButtons>
                <IonTitle className='ion-text-center'>SCAN</IonTitle>
            </CustomHeader> */}
            <CustomContent>
                <div className="outer-layer">

                    <div className="inner-layer">
                        <div className="scan-area"></div>
                    </div>
                </div>

            </CustomContent>
        </>
    )
}

export default OpenedScanner