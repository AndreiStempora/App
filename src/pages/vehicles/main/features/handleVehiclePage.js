import { useIonAlert } from '@ionic/react';
import { useLanguage } from '../../../../packages/multiLanguage';
import {vehiclesService} from "../../../../packages/database";
import {network} from "../../../../packages/network";
import {useRef, useState, useEffect} from "react";
import {useDbRequest} from "../../../../packages/database";
import {useRSelection} from "../../../../services/customHooks/utilityHooks";



const useVehiclePage = () => {
      const [translate] = useLanguage();
      const [presentAlert] = useIonAlert();
      const elementsRef = useRef([]);
      const [showCheckbox, setShowCheckbox] = useState(false);
      const dbRequest = useDbRequest();
      const [setCurrentSelection, getCurrentSelection] = useRSelection();
      const [elementsForUpload, setElementsForUpload] = useState([]);
      const [uploading, setUploading] = useState(false);
      const alertSelectVehicles = () => {
            return presentAlert({
                  header: translate('Please select at least one vehicle'),
                  cssClass: 'custom-alert',
                  buttons: [
                        {
                              text: translate('Ok'),
                              cssClass: 'alert-button-confirm',
                        },
                  ],
            })
      }
      const setCheckValues = () => {
            let allChecked = true;
            getCurrentRefs();
            elementsRef.current?.forEach(element => {
                  if (!element.querySelector('ion-checkbox').checked) {
                        allChecked = false;
                  }
            })
            elementsRef.current?.forEach(element => {
                  element.querySelector('ion-checkbox').checked = !allChecked;
            });
      };

      const deselectAll = () => {

            if (showCheckbox) {
                  elementsRef.current = elementsRef.current?.filter(element => element !== null);
                  elementsRef.current?.forEach(element => {
                        element.querySelector('ion-checkbox').checked = false;
                  });
            }
      };

      const editVehicleHandler = () => {

            deselectAll();
            setShowCheckbox(!showCheckbox);
      };

      const deleteVehicleHandler = async () => {
            const selectedVehicles = getCurrentRefs();
            if (selectedVehicles.length) {
                  await presentAlert({
                        header: translate('Are you sure you want to delete selected vehicle/s?'),
                        cssClass: 'custom-alert',
                        buttons: [
                              {
                                    text: translate('No'),
                                    cssClass: 'alert-button-cancel',
                              },
                              {
                                    text: translate('Yes'),
                                    cssClass: 'alert-button-confirm',
                                    handler: async () => {
                                          await Promise.all(
                                              elementsRef.current.map(async element => {
                                                    if (element.querySelector('ion-checkbox').checked) {
                                                          console.log(element);
                                                          return await dbRequest.requestFunction(async () => await vehiclesService.deleteVehicleById([element.id]));
                                                    }
                                                    return null;
                                              })
                                          )
                                          setCurrentSelection('refresh');
                                    }
                              },
                        ],
                  })
            } else {
                  await alertSelectVehicles();
            }
      };
      const getCurrentRefs = () => {
            elementsRef.current = elementsRef.current.filter(element => element !== null);
            const selectedVehicles = elementsRef.current.filter(element => element.querySelector('ion-checkbox').checked);
            return selectedVehicles;
      }

      const uploadVehicleHandler = async () => {
            if (await network.getCurrentNetworkStatus()) {
                  const selectedVehicles = getCurrentRefs();
                  if (selectedVehicles.length) {
                        await presentAlert({
                              header: translate('Are you sure you want to upload pictures of selected vehicle/s?'),
                              cssClass: 'custom-alert',
                              buttons: [
                                    {
                                          text: translate('No'),
                                          cssClass: 'alert-button-cancel',
                                    },
                                    {
                                          text: translate('Yes'),
                                          cssClass: 'alert-button-confirm',
                                          handler: async () => {
                                                let forUpload = [];
                                                selectedVehicles.forEach(element => {
                                                      if (element.querySelector('ion-checkbox').checked) {
                                                            forUpload.push(parseInt(element.id));
                                                      }
                                                });
                                                console.log(forUpload);
                                                setElementsForUpload(forUpload);
                                                setUploading(true);
                                          }
                                    },
                              ],
                        })

                  } else {
                        await alertSelectVehicles();
                  }
            } else {
                  return presentAlert({
                        header: translate('No internet connection'),
                        cssClass: 'custom-alert',
                        buttons: [
                              {
                                    text: translate('Ok'),
                                    cssClass: 'alert-button-confirm',
                              },
                        ],
                  })
            }
      };

      useEffect(() => {
            if (uploading === false) {
                  setElementsForUpload([]);
            }
      }, [uploading]);

      return {
            deselectAll,
            setCheckValues,
            editVehicleHandler,
            deleteVehicleHandler,
            uploadVehicleHandler,
            elementsRef,
            showCheckbox,
            setShowCheckbox,
            uploading,
            setUploading,
            elementsForUpload,
            getCurrentSelection,
            setElementsForUpload,
            translate
      }
}

export default useVehiclePage;