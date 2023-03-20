import { IonButtons, IonButton, IonIcon, IonLabel } from '@ionic/react'
import CustomFooter from '../CustomFooter';
import './footerDeleteUpload.scss'
import { useLanguage } from '../../../../packages/multiLanguage';

const FooterDeleteUpload = ({ del, retake, upload }) => {
      const [translate] = useLanguage();

    return (
        <CustomFooter>
            <IonButtons>
                {del &&
                    <IonButton onClick={del} className='icon-over-text'>
                        <div className="container delete">
                            <IonIcon icon='/assets/svgs/delete.svg'></IonIcon>
                            <IonLabel>{translate("Delete")}</IonLabel>
                        </div>
                    </IonButton>
                }
                {retake &&
                    <IonButton onClick={retake} className='icon-over-text'>
                        <div className="container">
                            <IonIcon icon='/assets/svgs/retake.svg'></IonIcon>
                            <IonLabel>{translate("Retake")}</IonLabel>
                        </div>
                    </IonButton>
                }
                {upload &&
                    <IonButton onClick={upload} className='icon-over-text'>
                        <div className="container">
                            <IonIcon icon='/assets/svgs/upload.svg'></IonIcon>
                            <IonLabel>{translate("Upload")}</IonLabel>
                        </div>
                    </IonButton>
                }
            </IonButtons>
        </CustomFooter>
    )
}

export default FooterDeleteUpload