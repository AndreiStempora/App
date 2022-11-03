import { IonItem,IonLabel,IonImg, IonIcon } from '@ionic/react';
import { user } from '../../../services';
import { useAtom } from 'jotai';
import { useEffect, useState} from 'react';
import { useDbRequest, imagesService } from '../../../packages/database';
import './hotspotWithPic.scss';

const HotspotItemWithPic = ({hotspot}) => {
    const dbRequest = useDbRequest();
    const [currentSelection, setCurrentSelection] = useAtom(user.userCurrentSelections);
    const [hotspotImage, setHotspotImage] = useState(null);

    const getImage = async () => {
        const image = await dbRequest.requestFunction(async () => await imagesService.getImageByVehicleIdAndHotspotId([currentSelection.vehicle_id, hotspot.hotspot_id]));
        setHotspotImage(image);
    }

    const selectItemHandler = () => {
        setCurrentSelection({...currentSelection, hotspot_id: hotspot.hotspot_id});
    }

    useEffect(() => {   
        getImage();
            console.log(hotspot);
            console.log(hotspotImage);
    }, []);

    return (
        <IonItem button={true} onClick={selectItemHandler} className={'item-with-picture'}>
            <IonImg src={hotspotImage?('/assets/img/carPicPlaceholder.png'):("https://www.w3schools.com/w3images/avatar2.png")} />
            <IonLabel>{hotspot.hotspot_name}</IonLabel>
            <IonIcon class='forward-icon' icon={`/assets/svgs/next.svg`}></IonIcon>
        </IonItem>
    
    )
}

export default HotspotItemWithPic;