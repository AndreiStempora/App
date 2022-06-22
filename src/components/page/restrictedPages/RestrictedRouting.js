// import { IonRouterOutlet } from '@ionic/react';
// import { useAtom } from 'jotai';
// import { useEffect } from 'react';
// import { useHistory } from 'react-router';
// import { user } from '../../../services/user/user';

// const RestrictedRouting = ({children}) => {
//     const history = useHistory();
//     const [,loggedIn] = useAtom(user.getLoggedIn);
    
//     // useEffect(() => {
//     //     if(!loggedIn()){
//     //         history.push('/login')
//     //     }
//     // }, [loggedIn]);

//     return (
//         <IonRouterOutlet>
//             {children}
//         </IonRouterOutlet>
//     )
// }

// export default RestrictedRouting;