import CustomHeader from "../../../../../components/page/pageMainComponents/CustomHeader";
import "./openedScanner.scss";
import { IonButton, IonButtons, IonIcon, IonHeader } from "@ionic/react";
import { CustomContent } from "../../../../../components/page/Page";


const OpenedScanner = ({ close }) => {

    const closeScan = async () => {
        close();
    }
    return (
        <>
            <CustomHeader>
                <IonButtons>
                    <IonButton onClick={closeScan}>

                        <IonIcon icon={'/assets/svgs/closeIcon.svg'}  color="#fff"></IonIcon>
                    </IonButton>
                </IonButtons>
            </CustomHeader>
            
            <CustomContent >
                <>
                    <div className="layer" ></div>
                    <div className="layer" ></div>
                </>
            </CustomContent>
        </>
    )
}

export default OpenedScanner