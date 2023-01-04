import React, { useState, useEffect } from 'react'
import { IonLoading, IonButton, IonProgressBar, IonItem, IonLabel } from '@ionic/react'
import { CustomContent } from '../page/Page';
import { useDbRequest, imagesService } from '../../packages/database';
import './fileUploader.scss';
import { useDeleteUpload } from '../../packages/database/features/utils/utilityHooks';

const FileUploader = ({ elements, setUploading, uploading }) => {
    const [uploadElements, setUploadElements] = useState([]);
    const dbRequest = useDbRequest();
    const delUpload = useDeleteUpload();
    let currentIndex = 0;
    let loadPercent = 0;

    useEffect(() => {
        if (uploading) {
            (async () => {
                let allPictures = await Promise.all(elements.map(async (element) => {
                    console.log(element, 'element')
                    const pics = await dbRequest.requestFunction(async () => imagesService.getAllImagesByVehicleId([element]));
                    return pics;
                })
                )
                allPictures = allPictures.flat();
                setUploadElements(allPictures);
                // await for each image to be uploaded before moving on to the next one
                allPictures.map(async (pic) => {
                    currentIndex++;
                    let request = await delUpload.uploadImage(pic);
                    request.upload.addEventListener('progress', (e) => {
                        const percent = e.loaded / e.total;
                        loadPercent = percent;
                    });
                    // console.log(request, 'request2');
                    request.addEventListener('load', async (e) => {
                        console.log(request.status, 'status');
                        if (request.status === 200) {
                            console.log('success');

                        }
                    })
                    request.onreadystatechange = function () {
                        if (request.readyState === 4 && request.status === 200) {
                            console.log('success2');
                            return true
                        }
                    };
                    // });
                    return true;
                })
                // // await for each image to be uploaded before moving on to the next one



                // allPictures.map(async (pic) => {
                //     currentIndex++;
                //     return await delUpload.uploadImage(pic);

                // })

            })()
            console.log(elements, 'aaaaaaaaaaaaaaaaaa')
        }

    }, [uploading]);

    return (

        <CustomContent
            gridClassStr={"content-in-center vertical-centering file-uploader"}
            colSizesArr={[[12, "ion-text-center"]]}
        >
            <>
                <IonButton onClick={() => setUploading(false)}>Upload</IonButton>
                <IonItem lines={'none'}>
                    <IonLabel className='ion-text-center'>Files Uploaded : {currentIndex} / {uploadElements.length} </IonLabel>
                </IonItem>
                <IonItem lines={'none'}>
                    <IonProgressBar value={loadPercent}></IonProgressBar>
                </IonItem>
            </>
        </CustomContent>

    )
}

export default FileUploader;