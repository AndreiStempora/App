import { useEffect, useState, useRef, useCallback } from 'react';
import { IonItemSliding, IonItemOptions, IonItemOption, IonItem, IonLabel, IonIcon, IonButtons, IonButton } from '@ionic/react'
import { timeout } from 'workbox-core/_private';


const SlidingListItem = ({ selectableItems, setSelectableItems }) => {
    const [startLongPress, setStartLongPress] = useState(false);


    useEffect(() => {
        let timerId;
        if (startLongPress) {
            let duration = 100;
            if (!selectableItems) {
                duration = 1500;
            }
            timerId = setTimeout(() => {
                setSelectableItems(true);
            }, duration);
        } else {
            clearTimeout(timerId);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [startLongPress]);

    const start = useCallback(() => {
        setStartLongPress(true);
        console.log('start')
    }, []);
    const stop = useCallback(() => {
        setStartLongPress(false);
        console.log('end')
    }, []);
    return (
        <IonItemSliding className='allin'>
            <IonItemOptions side="start">
                <IonItemOption color="success">
                    <IonButtons>
                        <IonButton
                            onTouchStart={start}
                            onTouchEnd={stop}
                            className='icon-over-text'
                        >
                            <div className="container">
                                <IonIcon icon='/assets/svgs/delete.svg'></IonIcon>
                                <IonLabel>delete</IonLabel>
                            </div>
                        </IonButton>
                    </IonButtons>
                </IonItemOption>
            </IonItemOptions>

            <IonItem>
                {selectableItems && <IonLabel>triggered</IonLabel>}
                <IonLabel>Sliding Item with Expandable Options</IonLabel>
            </IonItem>

            <IonItemOptions side="end">
                <IonItemOption color="danger" >
                    <IonButtons>
                        {/* <IonButton onClick={uploadVehicleHandler} className='icon-over-text'>
                            <div className="container">
                                <IonIcon icon='/assets/svgs/delete.svg'></IonIcon>
                                <IonLabel>delete</IonLabel>
                            </div>
                        </IonButton> */}
                    </IonButtons>
                    {/* <IonIcon icon='/assets/svgs/delete.svg'></IonIcon> */}
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    )
}

export default SlidingListItem