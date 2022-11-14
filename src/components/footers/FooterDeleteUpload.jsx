import { IonButtons, IonButton, IonIcon, IonLabel } from '@ionic/react'
import CustomFooter from '../pageMainComponents/CustomFooter'

const FooterDeleteUpload = ({del, retake, upload}) => {
    return (
        <CustomFooter>
            <IonButtons>
                {del &&
                    <IonButton onClick={del} className='icon-over-text'>
                        <div className="container">
                            <IonIcon icon='/assets/svgs/delete.svg'></IonIcon>
                            <IonLabel>delete</IonLabel>
                        </div>
                    </IonButton>
                }
                {retake &&
                    <IonButton onClick={retake} className='icon-over-text'>
                        <div className="container">
                            <IonIcon icon='/assets/svgs/retake.svg'></IonIcon>
                            <IonLabel>retake</IonLabel>
                        </div>
                    </IonButton>
                }
                {upload &&
                    <IonButton onClick={upload} className='icon-over-text'>
                        <div className="container">
                            <IonIcon icon='/assets/svgs/upload.svg'></IonIcon>
                            <IonLabel>upload</IonLabel>
                        </div>
                    </IonButton>
                }
            </IonButtons>
        </CustomFooter>
    )
}

export default FooterDeleteUpload