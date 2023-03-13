import { IonIcon, IonLabel, IonItem } from '@ionic/react';
import { useHistory } from 'react-router';
import { useRSelection } from '../../../services/customHooks/utilityHooks';
import './dealershipElement.scss'

const DealershipElement = ({ dealership }) => {
    const [editSelection, getSelection] = useRSelection();
    const history = useHistory();
    const clickHandler = () => {
        editSelection({...getSelection(), dealership_id: dealership.dealership_id });
        history.push("/vehicle-search");
    }

    return (
        <IonItem onClick={clickHandler} >
            <img className="dealership-image" src={dealership.dealership_logo} alt="" />
            <IonLabel>{dealership.dealership_name}</IonLabel>
            <IonIcon class='forward-icon' icon={`/assets/svgs/next.svg`}></IonIcon>
        </IonItem>
    )
}

export default DealershipElement