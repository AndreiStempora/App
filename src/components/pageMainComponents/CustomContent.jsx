import {IonContent, IonGrid, IonRow, IonCol} from '@ionic/react';

const CustomContent = ({children, colSizesArr, colClassStr, gridClassStr}) => {

    const renderCols = (colSizesArr) => {
        let arr = [];
        if(colSizesArr?.length > 1){
            for (let i = 0; i < colSizesArr.length; i++) {
                if(colSizesArr[i][1] !== undefined){
                    arr.push(
                        <IonCol size={colSizesArr[i][0]} key={i} className={colSizesArr[i][1]}>
                            {children[i]}
                        </IonCol>
                    )
                } else {
                    arr.push(
                        <IonCol size={colSizesArr[i][0]} key={i}>
                            {children[i]}
                        </IonCol>
                    )
                }
            }
        }else{
            arr.push(
                <IonCol size={'12'} key={0}>
                    {children}
                </IonCol>
            )
        }
        return arr;
    }

    return (
        <IonContent>
            <IonGrid className={gridClassStr}>
                <IonRow>
                    {renderCols(colSizesArr)}
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default CustomContent