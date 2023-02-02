import CustomHeader from "../../../../../components/page/pageMainComponents/CustomHeader";
import "./openedScanner.scss";
import { IonButton, IonButtons, IonTitle, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { CustomContent } from "../../../../../components/page/Page";


const OpenedScanner = ({ close }) => {

    const closeScan = async () => {
        close();
    }
    return (
        <>
            <IonFab>
                <IonFabButton size='small' color="transparent" className={'exit-scanner'}>
                    <IonIcon icon={'/assets/svgs/closeIcon.svg'} onClick={closeScan} color="#fff"></IonIcon>
                </IonFabButton>
            </IonFab>
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