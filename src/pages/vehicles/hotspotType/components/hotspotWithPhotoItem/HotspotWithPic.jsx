import { useIonViewWillEnter, IonSpinner, IonItem, IonLabel, IonImg, IonIcon, ionViewWillEnter } from '@ionic/react';
import { useRSelection } from '../../../../../packages/database/features/utils/utilityHooks';
import { useEffect, useState } from 'react';
import { FS } from '../../../../../packages/filesystem';
import ImageOrPlaceholderComponent from '../../../../../components/image/ImageOrPlaceholderComponent';
import './hotspotWithPic.scss';

const HotspotWithPic = ({ hotspotWithPhoto, openCamera, imageLoading }) => {
    const [editCurrentSelection, getCurrentSelection] = useRSelection();
    const [currentHotspot, setCurrentHotspot] = useState();
    const [hotspotImage, setHotspotImage] = useState();
    // const [imageLoading, setImageLoading] = useState(true);


    const selectItemHandler = async () => {
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
            <IonLabel>{hotspotWithPhoto[0]?.hotspot_name}</IonLabel>
            <IonIcon class='forward-icon' icon={`/assets/svgs/next.svg`}></IonIcon>
        </IonItem>
    )
}

export default HotspotWithPic;