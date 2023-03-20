import { IonSpinner, IonItem, IonLabel, IonImg, IonIcon, ionViewWillEnter } from '@ionic/react';
import { useRSelection } from '../../../../../services/customHooks/utilityHooks';
import {useLanguage} from "../../../../../packages/multiLanguage";
import ImageOrPlaceholderComponent from '../../../../../components/image/ImageOrPlaceholderComponent';
import './hotspotWithPic.scss';

const HotspotWithPic = ({ hotspotWithPhoto, openCamera, imageLoading }) => {
    const [editCurrentSelection, getCurrentSelection] = useRSelection();
    const [translate] = useLanguage();

    const selectItemHandler = async () => {
          console.log('hotspotWithPhoto[0] ', hotspotWithPhoto[0])
        editCurrentSelection({ hotspot_id: hotspotWithPhoto[0].hotspot_id });
        await openCamera();
    }

    return (
        <IonItem onClick={selectItemHandler} className={'item-with-picture'}>
            {
                imageLoading ?
                    <IonSpinner name="lines-sharp"></IonSpinner> :
                    <ImageOrPlaceholderComponent img={hotspotWithPhoto[1]} />
            }
            <IonLabel>{translate(`${hotspotWithPhoto[0]?.hotspot_name}`)}</IonLabel>
            <IonIcon class='forward-icon' icon={`/assets/svgs/next.svg`}></IonIcon>
        </IonItem>
    )
}

export default HotspotWithPic;