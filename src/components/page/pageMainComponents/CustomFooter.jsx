import { IonFooter, IonToolbar, IonTitle } from '@ionic/react';
import './customFooter.scss';

const CustomFooter = ({children}) => {
    return (
        <IonFooter>
            <IonToolbar>
                {children}
            </IonToolbar>
        </IonFooter>
    )
}

export default CustomFooter