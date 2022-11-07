import { IonImg, IonItem, IonLabel, IonIcon,IonCheckbox } from '@ionic/react'
import { useHistory } from 'react-router';
import { useState } from 'react';
import { useRSelection } from '../../../../packages/database/features/utils/utilityHooks';
import './adedVehiclesSearchItem.scss'

const AdedVehiclesSearchItem = ({ car, showCheckbox }) => {
    const [editSelection, getCurrentSelection] = useRSelection();
    const [markChecked, setMarkChecked] = useState(false);
    const history = useHistory();


    const itemClickHandler = async () => {
        editSelection({vehicle_id:car.vehicle_id});
        history.push("/vehicle-details");
    }

    const checkboxClickHandler = () => {
        setMarkChecked(!markChecked);
    }

    return (
        <IonItem 
            button={true} 
            onClick={showCheckbox?checkboxClickHandler:itemClickHandler} 
            lines='full' 
            className={'element-with-pics'}
        >
            <IonImg src="/assets/img/carPicPlaceholder.png"></IonImg>
                <IonLabel>
                    <h2>{car.vehicle_vin}</h2>
                    <h3>{car.vehicle_make} {car.vehicle_model} {car.vehicle_trim}</h3>
                </IonLabel>
                {showCheckbox ? 
                    <IonCheckbox
                        slot="end"
                        onChange={checkboxClickHandler}
                    /> : 
                    <IonIcon icon={'/assets/svgs/next.svg'}></IonIcon>
                }
        </IonItem>
    )
}

export default AdedVehiclesSearchItem