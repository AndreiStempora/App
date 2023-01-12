import { IonItem, IonImg, IonCheckbox, IonLabel, IonIcon } from "@ionic/react"
import { useEffect, useState, useRef, useCallback } from "react"
import { useDbRequest, imagesService } from "../../../packages/database";
import { useHistory } from "react-router";
import { FS } from "../../../packages/filesystem";
import React from "react";
import { useRSelection } from "../../../packages/database/features/utils/utilityHooks";
import ImageOrPlaceholderComponent from "../../image/ImageOrPlaceholderComponent";
import './vehicleItem.scss'

const VehicleItem = ({ item, image, showCheckbox, id, selectableItems, setShowCheckbox }, ref) => {
    const dbRequest = useDbRequest();
    const [itemImage, setItemImage] = useState(null);
    const [setCurrentSelection, getCurrentSelection] = useRSelection();
    const history = useHistory();
    const [img, setImg] = useState(null);
    const [startLongPress, setStartLongPress] = useState(false);
    const thisRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        if (image) {
            (async () => {
                const actualImage = await FS.showPicture(image?.image_data);
                setImg(actualImage);
            })();
        }
    }, []);

    const start = useCallback((e) => {
        thisRef.current = e.target;
        timerRef.current = setTimeout(() => {
            setShowCheckbox(true);
            thisRef.current.closest('ion-item').querySelector('ion-checkbox').checked = true;
        }, 1000);
    }, []);


    const stop = useCallback((e) => {
        clearTimeout(timerRef.current);
        console.log(showCheckbox, 'checkbox');
        console.log(thisRef.current.closest('ion-item').querySelector('ion-checkbox'), 'thisRef.current');
        if (thisRef.current.closest('ion-item').querySelector('ion-checkbox') === null) {
            setCurrentSelection({ vehicle_id: item.vehicle_id });
            history.push("/vehicle-details");
        }
    }, []);

    return (
        <IonItem
            onTouchStart={start}
            onTouchEnd={stop}
            lines='full'
            className={'element-with-pics'}
            ref={ref}
            id={id}
        >
            <ImageOrPlaceholderComponent img={img} />
            <IonLabel>
                <h2>{item?.vehicle_make} {item?.vehicle_model} {item?.vehicle_trim}</h2>
                <h3>{item?.vehicle_vin}</h3>
            </IonLabel>
            {showCheckbox &&
                <IonCheckbox
                    slot="end"
                />
            }
        </IonItem>
    )
}

export default React.forwardRef(VehicleItem);