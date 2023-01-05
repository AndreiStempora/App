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
    const [currentUpload, setCurrentUpload] = useState(0);
    const currentFile = useRef(0);
    // let currentIndex = 0;
    // let loadPercent = 0;

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
                let x = true;
                while (currentUpload < allPictures.length && x === true) {
                    let data = await delUpload.uploadImage(allPictures[currentFile.current]);
                    console.log(data, " -----------------------------------", currentFile.current)
                    x = await axios.post(uploadURL, data, {
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
                    if (x) {
                        currentFile.current++;
                        setCurrentUpload(currentFile.current);
                    }
                }
                // let x = allPictures.map(async (pic, index) => {
                //     setCurrentUpload(index + 1);
                //     let data = await delUpload.uploadImage(pic);
                //     // console.log(uploadURL, 'uploadURL');
                //     let x = await axios.post(uploadURL, data, {
                //         headers: {
                //             'Content-Type': 'multipart/form-data'
                //         },
                //         onUploadProgress: function (axiosProgressEvent) {
                //             const percent = axiosProgressEvent.loaded / axiosProgressEvent.total * 100;
                //             setUploadPercent(percent);
                //             // console.log(percent, 'percent', loadPercent, 'loadPercent')

                //         },
                //     }).then((res) => {
                //         if (res.status === 200) {
                //             console.log('success');
                //             return true;
                //         } else {
                //             return false;
                //         }
                //     })
                //     // request.upload.addEventListener('progress', (e) => {
                //     //     const percent = e.loaded / e.total;
                //     //     loadPercent = percent;
                //     // });
                //     // // console.log(request, 'request2');
                //     // request.addEventListener('load', async (e) => {
                //     //     console.log(request.status, 'status');
                //     //     if (request.status === 200) {
                //     //         console.log('success');

                //     //     }
                //     // })
                //     // request.onreadystatechange = function () {
                //     //     if (request.readyState === 4 && request.status === 200) {
                //     //         console.log('success2');
                //     //         return true
                //     //     }
                //     // };
                //     // });
                //     console.log(x, 'x')
                //     return x;
                // })
                // console.log(x, 'x')
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