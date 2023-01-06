import React, { useState, useEffect, useRef } from 'react'
import { IonLoading, IonButton, IonProgressBar, IonItem, IonLabel } from '@ionic/react'
import { CustomContent } from '../page/Page';
import { useDbRequest, imagesService } from '../../packages/database';
import './fileUploader.scss';
import { useAtom } from 'jotai';
import { URL } from '../../services/Requests/importantUrls';
import axios from 'axios';
import { useDeleteUpload } from '../../packages/database/features/utils/utilityHooks';

const FileUploader = ({ elements, setUploading, uploading }) => {
    const [uploadElements, setUploadElements] = useState([]);
    const dbRequest = useDbRequest();
    const delUpload = useDeleteUpload();
    const [uploadURL,] = useAtom(URL.upload);
    const [uploadPercent, setUploadPercent] = useState(0);
    const [uploadTotal, setUploadTotal] = useState(0);
    const [currentUpload, setCurrentUpload] = useState(0);
    const currentFile = useRef(0);

    // let currentIndex = 0;
    // let loadPercent = 0;

    useEffect(() => {
        if (uploading) {
            (async () => {
                let allPictures = await Promise.all(elements.map(async (element) => {
                    // console.log(element, 'element')
                    const pics = await dbRequest.requestFunction(async () => imagesService.getAllImagesByVehicleId([element]));
                    return pics;
                })
                )
                allPictures = allPictures.flat();
                setUploadElements(allPictures);
                // await for each image to be uploaded before moving on to the next one
                let array = [];
                console.log(allPictures, 'allPictures')
                while (currentFile.current < allPictures.length) {
                    setUploadPercent(0);
                    let data = await delUpload.uploadImage(allPictures[currentFile.current]);
                    console.log(data, " -----------------------------------", currentFile.current)
                    const serverResponse = await axios.post(uploadURL, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: function (axiosProgressEvent) {
                            const percent = axiosProgressEvent.loaded / axiosProgressEvent.total;
                            setUploadPercent(percent);
                            // console.log(percent, 'percent', loadPercent, 'loadPercent')

                        },
                    }).then((res) => {
                        if (res.status === 200) {
                            console.log('success');
                            return true;
                        } else {
                            return false;
                        }
                    })

                    array.push(serverResponse);
                    if (serverResponse) {
                        console.log('currentFile.current', currentFile.current)
                        currentFile.current++;

                        setCurrentUpload(currentFile.current);
                        setUploadTotal(currentFile.current / allPictures.length);
                    }
                }
                const responses = await Promise.all(array);
                console.log(array, 'array', responses, 'responses')
                if (responses.every((response) => response === true)) {
                    console.log('all good')
                    // setUploading(false);
                } else {
                    console.log('something went wrong');
                    // setUploading(false);
                }
            })()
            //

            console.log(elements, 'aaaaaaaaaaaaaaaaaa')
        }
        return () => {
            setUploadElements([]);
            setUploadPercent(0);
            setCurrentUpload(0);
            currentFile.current = 0;
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
                    <IonLabel className='ion-text-center'>Files Uploaded : {currentUpload} / {uploadElements.length} </IonLabel>
                </IonItem>
                <IonItem lines={'none'}>
                    <IonProgressBar value={uploadPercent}></IonProgressBar>
                </IonItem>
            </>
        </CustomContent>

    )
}

export default FileUploader;