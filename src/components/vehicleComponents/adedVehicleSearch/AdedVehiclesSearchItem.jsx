import { IonImg, IonItem, IonLabel } from '@ionic/react'
import './adedVehiclesSearchItem.scss'

const AdedVehiclesSearchItem = ({car, onClick, showCheckbox}) => {
    return (
        <IonItem button={true} onClick={onClick} lines='full' className={'element-with-pics'}>
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