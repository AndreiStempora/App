import { IonItem,IonLabel,IonImg, IonIcon } from '@ionic/react';
import { useRSelection } from '../../../../packages/database/features/utils/utilityHooks';
import { useEffect, useState} from 'react';
import { FS } from '../../../../packages/filesystem';
import './hotspotWithPic.scss';

const HotspotItemWithPic = ({hotspotWithPhoto, openCamera}) => {
    const [editCurrentSelection, getCurrentSelection] = useRSelection();
    const [currentHotspot, setCurrentHotspot] = useState(hotspotWithPhoto[0]);
    const [hotspotImage, setHotspotImage] = useState(hotspotWithPhoto[1]);


    const selectItemHandler = async() => {
        editCurrentSelection({hotspot_id: hotspotWithPhoto[0].hotspot_id});
        await openCamera();
    }

    useEffect(() => {   
        (async () => {
            if(hotspotWithPhoto[1].length){
                const image = await FS.showPicture(hotspotWithPhoto[1][0]?.image_data)
                setHotspotImage(image);
            }
        })();
            
    }, []);

    return (
        <IonItem button={true} onClick={selectItemHandler} className={'item-with-picture'}>
            <IonImg src={hotspotImage.length?hotspotImage:('/assets/img/carPicPlaceholder.png')} />
            <IonLabel>{currentHotspot?.hotspot_name}</IonLabel>
            <IonIcon class='forward-icon' icon={`/assets/svgs/next.svg`}></IonIcon>
        </IonItem>
    
    )
}

export default HotspotItemWithPic;