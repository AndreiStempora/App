import React, { useState, useEffect, useRef } from 'react'
import { IonLoading, IonButton, IonProgressBar, IonItem, IonLabel, useIonAlert, IonAlert } from '@ionic/react'
import { CustomContent } from '../page/Page';
import { useDbRequest, imagesService, vehiclesService } from '../../packages/database';
import './fileUploader.scss';
import { useAtom } from 'jotai';
import { URL } from '../../services/Requests/importantUrls';
import axios from 'axios';
import { useDeleteUpload, useRSelection } from '../../packages/database/features/utils/utilityHooks';

const FileUploader = ({ elements, setUploading, uploading, setRefresh }) => {
    const [uploadElements, setUploadElements] = useState([]);
    const dbRequest = useDbRequest();
    const delUpload = useDeleteUpload();
    const [uploadURL,] = useAtom(URL.upload);
    const currentLoadTotal = useRef(0);
    const [uploadPercent, setUploadPercent] = useState(currentLoadTotal.current);
    const [uploadTotal, setUploadTotal] = useState();
    const [currentUpload, setCurrentUpload] = useState(0);
    const currentFile = useRef(0);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [presentAlert] = useIonAlert();
    const [setCurrentSelection, getCurrentSelection] = useRSelection();

    useEffect(() => {
        if (uploading) {
            (async () => {
                let allPictures = await Promise.all(elements.map(async (element) => {
                    const pics = await dbRequest.requestFunction(async () => imagesService.getAllImagesByVehicleId([element]));
                    return pics;
                })
                )
                allPictures = allPictures.flat();
                setUploadElements(allPictures);
                let array = [];
                console.log(allPictures, 'allPictures')
                while (currentFile.current < allPictures.length) {
                    let data = await delUpload.uploadImage(allPictures[currentFile.current]);
                    const serverResponse = await axios.post(uploadURL, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: function (axiosProgressEvent) {
                            const progress = (Math.ceil(axiosProgressEvent.loaded / axiosProgressEvent.total) / allPictures.length);
                            currentLoadTotal.current = currentLoadTotal.current + progress;
                            setUploadPercent(currentLoadTotal.current);
                            console.log(currentLoadTotal.current, 'currentLoadTotal.current', progress, 'progress', currentFile.current, 'currentFile.current', allPictures.length, 'allPictures.length')
                        },
                    }).then(async (res) => {
                        if (res.status === 200) {
                            console.log('success', res.status)
                            return await delUpload.deleteImage(allPictures[currentFile.current]);
                        } else {
                            return false;
                        }
                    })

                    array.push(await serverResponse);
                    console.log(await serverResponse, 'serverResponse')
                    if (serverResponse) {
                        currentFile.current = currentFile.current + 1;
                        setCurrentUpload(currentFile.current);
                    }
                }
                const responses = await Promise.all(array);
                if (responses.every((response) => response === true)) {
                    setAlertMessage('All Pictures have been uploaded Successfully');
                } else {
                    setAlertMessage('Something went wrong, the Pictures that have not been uploaded will not be deleted from the device, so you can try uploading them again');
                }
                setAlert(true);

                elements.map(async (element) => {
                    const picturesLeft = await dbRequest.requestFunction(async () => imagesService.getAllImagesByVehicleId([element]));
                    console.log(picturesLeft, 'picturesLeft')
                    if (picturesLeft.length === 0) {
                        await dbRequest.requestFunction(async () => vehiclesService.deleteVehicleById([element]));
                    }
                })
            })()
        }
        return () => {
            setUploadElements([]);
            setUploadPercent(0);
            setCurrentUpload(0);
            currentFile.current = 0;
            currentLoadTotal.current = 0;
        }

    }, [uploading]);

    return (

        <CustomContent
            gridClassStr={"content-in-center vertical-centering file-uploader"}
            colSizesArr={[[12, "ion-text-center"]]}
        >
            <>
                <IonAlert
                    isOpen={alert}
                    onDidDismiss={() => {
                        setUploading(false);
                        setAlert(false)
                        setCurrentSelection({ ...getCurrentSelection(), refreshPage: !getCurrentSelection().refreshPage });
                    }}
                    header='Upload Complete'
                    message={alertMessage}
                    buttons={['OK']}
                ></IonAlert>
                {!alert &&
                    <>
                        {/* <IonButton onClick={() => setUploading(false)}>Upload</IonButton> */}
                        <IonItem lines={'none'}>
                            <IonLabel className='ion-text-center'>Files Uploaded : {currentUpload} / {uploadElements.length} </IonLabel>
                        </IonItem>
                        <IonItem lines={'none'}>
                            <IonProgressBar value={uploadPercent}></IonProgressBar>
                        </IonItem>
                    </>
                }
            </>
        </CustomContent>

    )
}

export default FileUploader;