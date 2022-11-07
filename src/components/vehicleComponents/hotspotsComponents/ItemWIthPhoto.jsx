import { IonItem, IonImg, IonLabel, IonIcon } from "@ionic/react"
import { useEffect, useState } from "react"
import { useDbRequest, imagesService } from "../../../packages/database";
import { FS } from "../../../packages/filesystem";
import { useRSelection } from "../../../packages/database/features/utils/utilityHooks";

const ItemWIthPicture = ({item,image}) => {
    const dbRequest = useDbRequest();
    const [itemImage, setItemImage] = useState(null);
    const [currentSelection, getCurrentSelection] = useRSelection();

    useEffect(() => {
        if(image !== undefined){
            (async () => {
                const imageObj = await dbRequest.requestFunction(async () => await imagesService.getImageByVehicleIdAndHotspotId([getCurrentSelection().vehicle_id, getCurrentSelection().hotspot_id]));
                const img = await FS.showPicture(imageObj[0].image_data);
                setItemImage(img);
            })();
            
        }
    }, [])

    return(
        <IonItem>
            <IonImg src={itemImage?'./':'/assets/img/carPicPlaceholder.png'}/>
            <IonLabel></IonLabel>
            <IonIcon icon={'./'}/>
        </IonItem>
    )
}

export default ItemWIthPicture