import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/react';
import './customHeader.scss'
const CustomHeader = ({children}) => {
    return (
        <IonHeader>
            <IonToolbar>
                {children}
            </IonToolbar>
        </IonHeader>

    )
}

export default CustomHeader