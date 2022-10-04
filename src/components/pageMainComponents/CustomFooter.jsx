import { IonFooter, IonToolbar, IonTitle } from '@ionic/react';

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