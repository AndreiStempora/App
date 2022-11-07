import {IonContent, IonGrid, IonRow, IonCol} from '@ionic/react';

const CustomContent = ({children, colSizesArr, gridClassStr}) => {

    const renderCols = (colSizesArr,children) => {
        const arr = [];
            if(colSizesArr === undefined){
                colSizesArr = [[12]];
            }

            for (let i = 0; i < colSizesArr?.length; i++) {
                arr.push(
                    <IonCol 
                        key={i}
                        size={colSizesArr[i][0]}  
                        className={colSizesArr[i][1]?colSizesArr[i][1]:''}
                    >
                        {children[i] ? children[i] : children}
                    </IonCol>
                )
            }
        return arr;
    }

    return (
        <IonContent>
            <IonGrid className={gridClassStr}>
                <IonRow>
                    {renderCols(colSizesArr,children)}
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default CustomContent