import React from 'react'
import { IonItem, IonList,IonLabel, IonIcon } from '@ionic/react';
import { useAtom } from 'jotai';
import { useHistory } from 'react-router';
import { TwoFA } from '../features/TwoFA';

const TwoFaElements = ({services}) => {
    const history = useHistory();
    const [service,setService] = useAtom(TwoFA.selectedOption);

    const click = (service)=>{
        setService(service);
        history.push("/2fa/service");
    }

    return (
        <IonList>
            <div>TwoFaElement</div>
            {services?.map((service,index)=>(
                <IonItem key={index} onClick={()=>click(service)}>
                    {service.icon &&
                        <IonIcon icon={services.icon}></IonIcon>
                    }
                    <IonLabel>{service.title}</IonLabel>
                    <p>{service.title}</p>
                </IonItem>
            ))}
        </IonList>
    )
}

export default TwoFaElements