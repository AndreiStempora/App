import { IonIcon, IonLabel, IonItem } from '@ionic/react';
import { useAtom } from "jotai";
import { user } from '../../../../services';
import { useHistory } from 'react-router';
import './dealershipElement.scss'

// const [selectedDealershipId, setSelectedDealershipId] = atomWithStorage('selectedDealershipId', null);
const DealershipElement = ({dealership}) => {
    const [selectedDealershipId , setSelectedDealershipId] = useAtom(user.userSelectedDealership);
    const history = useHistory();
    const clickHandler = () => {
        setSelectedDealershipId(dealership.dealership_id);
        history.push("/vehicle-search");
    }

    return (
        <IonItem onClick={clickHandler} >
            <img className="dealership-image" src={dealership.dealership_logo} alt=""/>
            <IonLabel>{dealership.dealership_name}</IonLabel>
            <IonIcon class='forward-icon' icon={`/assets/svgs/next.svg`}></IonIcon>
        </IonItem>
    )
}

export default DealershipElement