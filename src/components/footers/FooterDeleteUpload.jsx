import { IonButtons, IonButton, IonIcon, IonLabel } from '@ionic/react'
import React from 'react'
import CustomFooter from '../pageMainComponents/CustomFooter'

const FooterDeleteUpload = () => {
    return (
        <CustomFooter>
            <IonButtons>
                <IonButton className='icon-over-text'>
                    <div className="container">
                        <IonIcon icon='/assets/svgs/delete.svg'></IonIcon>
                        <IonLabel>delete</IonLabel>
                    </div>
                </IonButton> 
                <IonButton className='icon-over-text'>
                    <div className="container">
                        <IonIcon icon='/assets/svgs/upload.svg'></IonIcon>
                        <IonLabel>upload</IonLabel>
                    </div>
                </IonButton>
            </IonButtons>
        </CustomFooter>
    )
}

export default FooterDeleteUpload