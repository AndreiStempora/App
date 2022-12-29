import React, { useState } from 'react'
import { IonLoading, IonProgressBar, IonItem, IonLabel } from '@ionic/react'
import { CustomContent } from '../page/Page';
import './fileUploader.scss';

const FileUploader = ({ elements }) => {

    let elements2 = [1, 2, 3, 4, 5];
    return (

        <CustomContent
            gridClassStr={"content-in-center vertical-centering file-uploader"}
            colSizesArr={[[12, "ion-text-center"]]}
        >
            <>
                <IonItem lines={'none'}>
                    <IonLabel className='ion-text-center'>Files Uploaded : {elements2.length - 3} / {elements2?.length} </IonLabel>
                </IonItem>
                <IonItem lines={'none'}>
                    <IonProgressBar value={0.3}></IonProgressBar>
                </IonItem>
            </>
        </CustomContent>

    )
}

export default FileUploader;