import {CustomContent} from "../../page/Page";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {IonItem, IonLabel, IonProgressBar, useIonAlert} from "@ionic/react";
import {useDbRequest, imagesService} from "../../../packages/database";
import './fileUploaderTurbo.scss';
import { FS} from "../../../packages/filesystem";
import {useDeleteUpload} from "../../../services/customHooks/utilityHooks";
import {useAtom} from "jotai";
import {URL} from "../../../services";


const FileUploaderTurbo = ({elements, setUploading}) => {
      const dbRequest = useDbRequest();
      const delUpload = useDeleteUpload();
      const [uploadURL,] = useAtom(URL.upload);
      const { CancelToken } = axios;
      const source = CancelToken.source();
      let cancel;

      const getPics = async () => {
            let allPictures = await Promise.all(elements.map(async (element) => {
                      const pics = await dbRequest.requestFunction(async () => imagesService.getAllImagesByVehicleId([element]));
                      return pics;
                })
            )
            return allPictures.flat();
      }

      useEffect(() => {
            (async () => {
                  const pics = await getPics();

                  pics.map(async pic => {
                        let data = await delUpload.uploadImage(pic.image_data);
                  //       // console.log(x, 'x')
                        //simulate a timeout
                        // const AbortSignal = axios.CancelToken.source();
                        // setTimeout(() => {
                        //       // AbortSignal.cancel("timeout");
                        //
                        // }, 3000);

                        try{
                              const serverResponse = await axios.post(
                                  uploadURL,
                                  data,
                                  {
                                        headers: {
                                              'Content-Type': 'multipart/form-data'
                                        },

                                        onUploadProgress: function (axiosProgressEvent) {
                                              // const progress = (Math.ceil(axiosProgressEvent.loaded / axiosProgressEvent.total) / allPictures.length);
                                              // currentLoadTotal.current = currentLoadTotal.current + progress;
                                              // setUploadPercent(currentLoadTotal.current);
                                              // console.log(currentLoadTotal.current, 'currentLoadTotal.current', progress, 'progress', currentFile.current, 'currentFile.current', allPictures.length, 'allPictures.length')
                                              clearTimeout(cancelTimer);
                                              // set new cancel timer
                                              const cancelTimer = setTimeout(() => {
                                                    cancel('Upload timeout'); // cancel the request
                                              }, 5000); // 5 seconds
                                        },
                                        cancelToken: new CancelToken(function executor(c) {
                                              // An executor function receives a cancel function as a parameter
                                              cancel = c;
                                        }),

                                  }).then(async (response) => {
                                    console.log(response, 'response');
                                    if (response.status === 200) {
                                          // console.log('success', res.status);
                                          // return await delUpload.deleteImage(allPictures[currentFile.current]);
                                    } else {
                                          return false;
                                    }
                              })
                        }catch(e){
                              console.log(e, 'e')
                        }




                        // const data = await delUpload.uploadImage(pic?.image_data);
                  })


            })()

      }, []);

      return (
          <CustomContent
              gridClassStr={"content-in-center vertical-centering file-uploader"}
              colSizesArr={[[12, "ion-text-center"]]}
          >
                <div className={"file-uploader__container"}>
                      <IonItem lines={'none'}>
                            {/*<IonLabel className='ion-text-center'>Files Uploaded : {currentUpload} / {uploadElements.length} </IonLabel>*/}
                      </IonItem>

                      <IonItem lines={'none'}>
                            {/*<IonProgressBar value={uploadPercent}></IonProgressBar>*/}
                      </IonItem>

                </div>
          </CustomContent>
      )
}

export default FileUploaderTurbo;

