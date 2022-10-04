import {IonContent, IonGrid, IonRow, IonCol} from '@ionic/react';

const CustomContent = ({children,colSizesArr,gridClassStr}) => {
    return (
        <IonContent>
            <IonGrid className={gridClassStr}>
                <IonRow>
                    {colSizesArr.map((size, index) => (
                        <IonCol key={index} size={size}>
                            {children[index]}
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default CustomContent