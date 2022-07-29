import React from 'react'
import { IonItem, IonList,IonLabel, IonIcon } from '@ionic/react';
import { usePageSetters } from '../../../services';
import { useAtom } from 'jotai';
import { TwoFA } from '../features/TwoFA';
import './twoFaElements.scss';


const TwoFaElements = ({services}) => {
    const requestSetters = usePageSetters();
    const [service,setService] = useAtom(TwoFA.selectedOption);

    const getIcon = (str) => {
        const str2 = str.replace(/ /g, '');
        const str3 = str2.replace('svgicon', '');
        return str3;
	}

    const click = (service)=>{
        setService(service);
        requestSetters.push("/2fa/code");
    }

    return (
        <IonList>
            {services?.map((service,index)=>(
                <IonItem key={index} onClick={()=>click(service)}>
                    {service.icon &&
                        <IonIcon class='option-icon' icon={`/assets/svgs/${getIcon(service.icon)}.svg`}></IonIcon>
                    }
                    <IonLabel>{service.widget}</IonLabel>
                    <IonIcon class='forward-icon' icon={`/assets/svgs/next.svg`}></IonIcon>
                </IonItem> 
            ))}
        </IonList>
    )
}

export default TwoFaElements