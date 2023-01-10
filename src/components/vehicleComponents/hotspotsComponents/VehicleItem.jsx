import { IonItem, IonImg, IonCheckbox, IonLabel, IonIcon } from "@ionic/react"
import { useEffect, useState, useRef } from "react"
import { useDbRequest, imagesService } from "../../../packages/database";
import { useHistory } from "react-router";
import { FS } from "../../../packages/filesystem";
import React from "react";
import { useRSelection } from "../../../packages/database/features/utils/utilityHooks";
import ImageOrPlaceholderComponent from "../../image/ImageOrPlaceholderComponent";
import './vehicleItem.scss'

const VehicleItem = ({ item, image, showCheckbox, id }, ref) => {
    const dbRequest = useDbRequest();
    const [itemImage, setItemImage] = useState(null);
    const [editSelection, getCurrentSelection] = useRSelection();
    const [checkmark, setCheckmark] = useState(false);
    const history = useHistory();
    const [img, setImg] = useState(null);
    const checkboxRef = useRef(null);
    const checkboxClickHandler = () => { }

    useEffect(() => {
        if (image) {
            (async () => {
                const actualImage = await FS.showPicture(image?.image_data);
                setImg(actualImage);
            })();
        }
    }, []);

    useEffect(() => {
        console.log('checkmark', checkmark);
        //     if (checkboxRef.current.checked) {
        //         // setCheckmark(checkboxRef.current);
        //         setCheckmark(true);
        //     }
        //     else {

        //     }
    }, [checkmark]);

    const itemClickHandler = () => {
        editSelection({ vehicle_id: item.vehicle_id });
        history.push("/vehicle-details");
    }

    return (
        <IonItem
            onClick={showCheckbox ? checkboxClickHandler : itemClickHandler}
            lines='full'
            className={'element-with-pics'}
            ref={ref}
            id={id}
        >
            <ImageOrPlaceholderComponent img={img} checkmark={checkmark} />
            <IonLabel>
                <h2>{item?.vehicle_make} {item?.vehicle_model} {item?.vehicle_trim}</h2>
                <h3>{item?.vehicle_vin}</h3>
            </IonLabel>
            {showCheckbox &&
                <IonCheckbox
                    slot="end"
                    ref={checkboxRef}

                    onIonChange={() => setCheckmark(checkboxRef.current.checked)}
                />
            }
        </IonItem>
    )
}

export default React.forwardRef(VehicleItem);