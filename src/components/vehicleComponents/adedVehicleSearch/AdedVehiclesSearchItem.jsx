import { IonImg, IonItem, IonLabel } from '@ionic/react'
import { user } from '../../../services';
import { useAtom } from 'jotai';
import { useHistory } from 'react-router';
import './adedVehiclesSearchItem.scss'

const AdedVehiclesSearchItem = ({car, onClick, showCheckbox}) => {
    const [selectedVehicleId, setSelectedVehicleId] = useAtom(user.userCurrentSelections);
    const history = useHistory();

    const itemClickHandler = async () => {
        console.log(car)
        setSelectedVehicleId({...selectedVehicleId, vehicle_id:car.vehicle_id});
        history.push("/vehicle-details");

    }
    return (
        <IonItem button={true} onClick={itemClickHandler} lines='full' className={'element-with-pics'}>
                <IonImg src="/assets/img/carPicPlaceholder.png"></IonImg>
                    <IonLabel>
                        <h2>{car.vehicle_vin}</h2>

                        <h3>{car.vehicle_make} {car.vehicle_model} {car.vehicle_trim}</h3>
                    </IonLabel>
                    {showCheckbox && <input type="checkbox" />}
                
        </IonItem>
    )
}

export default AdedVehiclesSearchItem