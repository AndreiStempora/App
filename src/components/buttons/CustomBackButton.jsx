import { useHistory } from "react-router";
import { IonButton, IonIcon } from "@ionic/react";
import './customBackButton.scss'

const CustomBackButton = ({ href, extraFunction }) => {
    const history = useHistory();

    const clickHandler = () => {
        if (extraFunction) {
            extraFunction();
        }
        if (href !== undefined) {
            history.push({ pathname: href, state: { ...history.location.state } });
        }
    }

    return (
        <IonButton slot="start" onClick={clickHandler} className={'return-btn'}>
            <IonIcon icon="assets/svgs/previous.svg"></IonIcon>
        </IonButton>
    )
}

export default CustomBackButton