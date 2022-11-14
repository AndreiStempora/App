import { useHistory } from "react-router";
import { IonButton, IonIcon } from "@ionic/react";

const CustomBackButton = ({ href, extraFunction }) => {
    const history = useHistory();

    const clickHandler = () => {
        if (extraFunction) {
            extraFunction();
        }
        history.push(href);
    }

    return (
        <IonButton slot="start" onClick={clickHandler}>
            <IonIcon icon="assets/svgs/previous.svg"></IonIcon>
        </IonButton>
    )
}

export default CustomBackButton