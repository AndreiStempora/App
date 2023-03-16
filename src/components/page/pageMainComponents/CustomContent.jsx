import {IonContent, IonGrid, IonRow, IonCol} from '@ionic/react';
import './customContent.scss'

const CustomContent = ({children, colSizesArr, gridClassStr, scrollEvents,scrollHandler}) => {

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
        <IonContent scrollEvents={scrollEvents?true:false} onIonScroll={scrollHandler?scrollHandler:null}>
            <IonGrid className={gridClassStr}>
                <IonRow>
                    {renderCols(colSizesArr,children)}
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default CustomContent