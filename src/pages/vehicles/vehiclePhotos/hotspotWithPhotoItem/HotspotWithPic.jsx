import { useIonViewWillEnter, IonSpinner, IonItem,IonLabel,IonImg, IonIcon, ionViewWillEnter } from '@ionic/react';
import { useRSelection } from '../../../../packages/database/features/utils/utilityHooks';
import { useEffect, useState} from 'react';
import { FS } from '../../../../packages/filesystem';
import ImageOrPlaceholderComponent from '../../../../components/image/ImageOrPlaceholderComponent';
import './hotspotWithPic.scss';

const HotspotItemWithPic = ({hotspotWithPhoto, openCamera}) => {
    const [editCurrentSelection, getCurrentSelection] = useRSelection();
    const [currentHotspot, setCurrentHotspot] = useState(hotspotWithPhoto[0]);
    const [hotspotImage, setHotspotImage] = useState(hotspotWithPhoto[1]);
    const [imageLoading, setImageLoading] = useState(true);


    const selectItemHandler = async() => {
        editCurrentSelection({hotspot_id: hotspotWithPhoto[0].hotspot_id});
        await openCamera();
    }

    useEffect(() => {  
        (async () => {
            try{
                if(hotspotWithPhoto[1]){
                    const image = await FS.showPicture(hotspotWithPhoto[1]?.image_data)
                    setHotspotImage(image);
                }
            }catch(err){
                console.log(err);
            } finally{
                setImageLoading(false);
            }
        })(); 
    }, [hotspotWithPhoto]);

    return (
        <IonItem button={true} onClick={selectItemHandler} className={'item-with-picture'}>
            {
                imageLoading ?
                <IonSpinner name="lines-sharp"></IonSpinner>:
                <ImageOrPlaceholderComponent img={hotspotImage}/>
            }
            <IonLabel>{currentHotspot?.hotspot_name}</IonLabel>
            <IonIcon class='forward-icon' icon={`/assets/svgs/next.svg`}></IonIcon>
        </IonItem>
    )
}

export default HotspotItemWithPic;