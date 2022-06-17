import { IonRouterOutlet } from '@ionic/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

const RestrictedRouting = ({children}) => {
    const history = useHistory();
    let user = true;
    
    useEffect(() => {
        if(!user){
            history.push('/login')
        }
    }, [user]);

    return (
        <IonRouterOutlet>
            {children}
        </IonRouterOutlet>
    )
}

export default RestrictedRouting;