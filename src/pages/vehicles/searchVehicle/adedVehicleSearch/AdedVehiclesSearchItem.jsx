import { IonImg, IonItem, IonLabel, IonIcon, IonCheckbox } from '@ionic/react'
import { useHistory } from 'react-router';
import React from 'react';
import { useState, useEffect } from 'react';
import { useHotspot, useRSelection } from '../../../../packages/database/features/utils/utilityHooks';
import { useDbRequest, imagesService } from '../../../../packages/database';
import ImageOrPlaceholderComponent from '../../../../components/image/ImageOrPlaceholderComponent';
import './adedVehiclesSearchItem.scss'

const AdedVehiclesSearchItem = ({ car, showCheckbox, setCheckedElements, checkAll }, ref) => {
    const [editSelection, getCurrentSelection] = useRSelection();
    const hotspotHook = useHotspot();
    const dbRequest = useDbRequest();
    const [markChecked, setMarkChecked] = useState(false);
    const history = useHistory();

    const itemClickHandler = async () => {
        editSelection({ vehicle_id: car.vehicle_id });
        // history.push({ pathname: "/vehicle-details", state: { ...car } });
        console.log(`${history.location.pathname}/${car.vehicle_id}`)
        history.push({ pathname: `${history.location.pathname}/${car.vehicle_id}`, state: { ...car } });
    }

    const checkboxClickHandler = () => {

    }

    // useEffect(() => {
    //     setCheckedElements({ [car.vehicle_id]: markChecked });
    // }, [markChecked]);

    useEffect(() => {
        setMarkChecked(checkAll);
    }, [checkAll]);

    const searchForPhoto = async (hotspots) => {

    }

    useEffect(() => {
        setCheckedElements({ [car.vehicle_id]: markChecked });
    }, []);

    return (
        <IonItem
            onClick={showCheckbox ? checkboxClickHandler : itemClickHandler}
            lines='full'
            className={'element-with-pics'}
            ref={ref}
            data={car}
        >
            <ImageOrPlaceholderComponent />
            <IonLabel>
                <h2>{car.vehicle_vin}</h2>
                <h3>{car.vehicle_make} {car.vehicle_model} {car.vehicle_trim}</h3>
            </IonLabel>
            {showCheckbox ?
                <IonCheckbox
                    slot="end"
                    checked={markChecked}
                // onChange={checkboxClickHandler}
                /> :
                <IonIcon icon={'/assets/svgs/next.svg'}></IonIcon>
            }
        </IonItem>
    )
}

export default React.forwardRef(AdedVehiclesSearchItem)