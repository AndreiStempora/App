import { IonList, IonTitle, IonButtons, IonButton,  useIonAlert, IonIcon } from '@ionic/react';
import { Page, CustomHeader, CustomContent } from '../../../../components/page/Page';
import { useAtom } from 'jotai';
import { user } from '../../../../services/user/user';
import { useDbRequest, vehiclesService } from '../../../../packages/database';
import { useEffect, useState, useRef } from 'react';
import { useRSelection } from '../../../../packages/database/features/utils/utilityHooks';
import FooterAddVehicle from '../../../../components/page/pageMainComponents/footers/FooterAddVehicle';
import FooterDeleteUpload from '../../../../components/page/pageMainComponents/footers/FooterDeleteUpload';
import FileUploader from '../../../../components/uploader/FileUploader';
import VehicleItem from '../components/VehicleItem';
import { network } from '../../../../packages/network';
import './vehiclePage.scss';

const VehiclePage = () => {
    const dbRequest = useDbRequest();
    const userInfo = useAtom(user.userDetails);
    const [setCurrentSelection, getCurrentSelection] = useRSelection();
    const [showCheckbox, setShowCheckbox] = useState(false);
    const [cars, setCars] = useState([]);
    const elementsRef = useRef([]);
    const [uploading, setUploading] = useState(false);
    const [elementsForUpload, setElementsForUpload] = useState([]);
    const [presentAlert] = useIonAlert();

    useEffect(() => {
        (async () => {
            const cars = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesWithPics([getCurrentSelection().dealership_id]));
            setCars(cars);
        })();

        deselectAll();
        return () => {
            setCars([]);
        }
    }, [getCurrentSelection().refreshPage]);

    const alertSelectVehicles = () => {
        return presentAlert({
            header: 'Please select at least one vehicle',
            cssClass: 'custom-alert',
            buttons: [
                {
                    text: 'Ok',
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
                header: 'Are you sure you want to delete selected vehicle/s?',
                cssClass: 'custom-alert',
                buttons: [
                    {
                        text: 'No',
                        cssClass: 'alert-button-cancel',
                    },
                    {
                        text: 'Yes',
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
                    header: 'Are you sure you want to upload pictures of selected vehicle/s?',
                    cssClass: 'custom-alert',
                    buttons: [
                        {
                            text: 'No',
                            cssClass: 'alert-button-cancel',
                        },
                        {
                            text: 'Yes',
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
                header: 'No internet connection',
                cssClass: 'custom-alert',
                buttons: [
                    {
                        text: 'Ok',
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

    return (
        <Page pageClass={'vehiclesSearch'}>
            {uploading ?
                <FileUploader
                    elements={elementsForUpload}
                    setUploading={setUploading}
                    uploading={uploading}
                /> :
                <>
                    <CustomHeader>
                        <IonButtons slot="start" >
                            {showCheckbox ? <IonButton onClick={editVehicleHandler}><IonIcon icon='/assets/svgs/cancel.svg' /></IonButton> :
                                <IonButton defaultHref="/profile" >
                                    {userInfo.avatar ? <img src={userInfo.avatar} alt="avatar" /> : <IonIcon icon='/assets/svgs/user.svg' />}
                                </IonButton>
                            }
                        </IonButtons>

                        <IonTitle className='ion-text-center'>Vehicles Page</IonTitle>
                        <IonButtons slot="end" >
                            <IonButton onClick={showCheckbox ? setCheckValues : editVehicleHandler}>
                                {showCheckbox ? <IonIcon icon='/assets/svgs/SelectAll.svg' /> : <IonIcon icon='/assets/svgs/checklist.svg'></IonIcon>}

                            </IonButton>
                        </IonButtons>
                    </CustomHeader>
                    <CustomContent colSizesArr={[[12]]}>
                        <>
                            <IonList className='special-list'>
                                {cars?.map((car, index) =>
                                    <VehicleItem
                                        ref={(element) => elementsRef.current[index] = element}
                                        key={index}
                                        item={car}
                                        id={car.vehicle_id}
                                        showCheckbox={showCheckbox}
                                        setShowCheckbox={setShowCheckbox}
                                    />
                                )}
                            </IonList>
                        </>

                    </CustomContent>
                    {!showCheckbox ? <FooterAddVehicle /> :
                        <FooterDeleteUpload
                            del={deleteVehicleHandler}
                            retake={null}
                            upload={uploadVehicleHandler}
                        ></FooterDeleteUpload>
                    }
                </>
            }

        </Page>
    )
}

export default VehiclePage;


