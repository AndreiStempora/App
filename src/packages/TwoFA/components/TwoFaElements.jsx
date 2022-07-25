import React from 'react'
import { IonItem, IonList,IonLabel, IonIcon, IonButton } from '@ionic/react';
import { useAtom } from 'jotai';
import { useHistory } from 'react-router';
import { TwoFA } from '../features/TwoFA';

const TwoFaElements = ({services}) => {
    const history = useHistory();
    const [service,setService] = useAtom(TwoFA.selectedOption);

    const getIcon = (str) => {
        const str2 = str.replace(/ /g, '');
        const str3 = str2.replace('svgicon', '');
        return str3;
	}

    const click = (service)=>{
        setService(service);
        history.push("/2fa/service");
    }
    console.log(services,'services');

    return (
        <IonList>
            {services?.map((service,index)=>(
                <IonItem key={index} onClick={()=>click(service)}>
                    {service.icon &&
                        <IonIcon icon={`/assets/svgs/${getIcon(service.icon)}.svg`}></IonIcon>
                    }
                    <IonLabel>{service.widget}</IonLabel>
                    <IonIcon icon={`/assets/svgs/next.svg`}></IonIcon>
                </IonItem>
            ))}
        </IonList>
    )
}

export default TwoFaElements