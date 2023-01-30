import { CustomContent, CustomHeader, Page } from "../../components/page/Page";
import { IonButtons, IonTitle, IonIcon, IonImg, IonItem, IonList, IonLabel, useIonAlert } from "@ionic/react";
import { useHistory } from "react-router-dom";
import CustomBackButton from "../../components/buttons/CustomBackButton";
import { useAtom } from "jotai";
import { user } from '../../services/user/user'
import { useEffect } from "react";

const ProfilePage = () => {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useAtom(user.userDetails);
    const [currentToken, setCurrentToken] = useAtom(user.userDetails);
    const [isLoggedin, setIsLoggedin] = useAtom(user.loggedIn);
    const [presentAlert] = useIonAlert();

    const goBackHandler = () => {
        history.go('-1');
        // console.log(history)
    }

    useEffect(() => {
        console.log(currentUser)
    }, [])

    const logoutHandler = () => {
        presentAlert({
            header: 'Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                'Cancel',
                {
                    text: 'Ok', handler: () => {
                        history.push('/login')
                    }
                }
            ]
        })
    }

    return (
        <Page pageClass='profile'>
            <CustomHeader>
                <IonButtons slot="start">
                    <CustomBackButton
                        extraFunction={goBackHandler}
                        href='/vehicle-search'
                    />
                </IonButtons>
                <IonTitle className='ion-text-center'>Profile</IonTitle>
            </CustomHeader>
            <CustomContent
                // gridClassStr={"content-in-center"}
                colSizesArr={[[12, "ion-text-center"], [12, "ion-text-center"]]}
            >
                <>
                    {currentUser?.avatar ? <IonImg></IonImg> : <IonIcon icon='/assets/svgs/user.svg' />}
                    <h1>{currentUser?.first_name} {currentUser?.last_name}</h1>
                    <h3>{currentUser?.email}</h3>
                </>
                <IonList>
                    <IonItem onClick={logoutHandler}>
                        <IonIcon icon={'/assets/svgs/logout.svg'}></IonIcon>
                        <IonLabel>Logout</IonLabel>
                    </IonItem>
                </IonList>
            </CustomContent>
        </Page>
    )
}

export default ProfilePage;