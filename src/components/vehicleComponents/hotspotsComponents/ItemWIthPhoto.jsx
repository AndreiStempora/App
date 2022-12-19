import { IonItem, IonImg, IonCheckbox, IonLabel, IonIcon } from "@ionic/react"
import { useEffect, useState, useRef } from "react"
import { useDbRequest, imagesService } from "../../../packages/database";
import { useHistory } from "react-router";
import { FS } from "../../../packages/filesystem";
import React from "react";
import { useRSelection } from "../../../packages/database/features/utils/utilityHooks";
import ImageOrPlaceholderComponent from "../../image/ImageOrPlaceholderComponent";

const ItemWithPhoto = ({ item, image, showCheckbox, car, checkAll, setCheckedElements }, ref) => {
    const dbRequest = useDbRequest();
    const [itemImage, setItemImage] = useState(null);
    const [editSelection, getCurrentSelection] = useRSelection();
    const checkboxRef = useRef(null);
    const history = useHistory();
    const [img, setImg] = useState(null);
    // console.log(image)
    const checkboxClickHandler = () => { }

    const itemClickHandler = () => {
        editSelection({ vehicle_id: item.vehicle_id });
        history.push("/vehicle-details");
    }

    useEffect(() => {
        (async () => {
            let data = await image;
            const actualImage = await FS.showPicture(data?.image_data);
            setImg(actualImage);
        })();
    }, []);

    return (
        <IonItem
            onClick={showCheckbox ? checkboxClickHandler : itemClickHandler}
            lines='full'
            className={'element-with-pics'}
            ref={ref}
            data={item}
        >
            <ImageOrPlaceholderComponent img={img} />
            <IonLabel>
                {car ? <h2>{item?.vehicle_vin}</h2> : <h2>{item?.name}</h2>}
                <h3>{item?.vehicle_make} {item?.vehicle_model} {item?.vehicle_trim}</h3>
            </IonLabel>
            {showCheckbox ?
                <IonCheckbox
                    slot="end"
                /> :
                <IonIcon icon={'/assets/svgs/next.svg'}></IonIcon>
            }
        </IonItem>
    )
};

export default React.forwardRef(ItemWithPhoto)