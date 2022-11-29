import { IonImg, IonItem, IonLabel, IonIcon, IonCheckbox } from '@ionic/react'
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import { useHotspot, useRSelection } from '../../../../packages/database/features/utils/utilityHooks';
import { useDbRequest, imagesService } from '../../../../packages/database';
import ImageOrPlaceholderComponent from '../../../../components/image/ImageOrPlaceholderComponent';
import './adedVehiclesSearchItem.scss'

const AdedVehiclesSearchItem = ({ car, showCheckbox, setCheckedElements, checkAll }) => {
    const [editSelection, getCurrentSelection] = useRSelection();
    const hotspotHook = useHotspot();
    const dbRequest = useDbRequest();
    const [markChecked, setMarkChecked] = useState(false);
    const history = useHistory();

    const itemClickHandler = async () => {
        editSelection({ vehicle_id: car.vehicle_id });
        history.push("/vehicle-details");
    }

    const checkboxClickHandler = () => {
        setMarkChecked(!markChecked);
    }

    useEffect(() => {
        setCheckedElements({ [car.vehicle_id]: markChecked });
    }, [markChecked]);

    useEffect(() => {
        setMarkChecked(checkAll);
    }, [checkAll]);

    const searchForPhoto = async (hotspots) => {

    }

    useEffect(() => {
        setCheckedElements({ [car.vehicle_id]: markChecked });
        // console.log(car, 'car');
        // (async () => {
        //     const hots = await hotspotHook.getHotspotsByGivenType(2);
        //     console.log(hots, 'hots');
        //     searchForPhoto(hots);
        // })();
    }, []);

    return (
        <IonItem
            onClick={showCheckbox ? checkboxClickHandler : itemClickHandler}
            lines='full'
            className={'element-with-pics'}
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
                    onChange={checkboxClickHandler}
                /> :
                <IonIcon icon={'/assets/svgs/next.svg'}></IonIcon>
            }
        </IonItem>
    )
}

export default AdedVehiclesSearchItem