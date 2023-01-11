import { IonList, IonTitle, IonButtons, IonButton, IonLoading, IonItem, useIonAlert, IonIcon, IonRefresh, IonLabel, IonCheckbox, useIonViewWillEnter, useIonViewDidEnter } from '@ionic/react';
import { Page, CustomHeader, CustomContent, CustomFooter } from '../../components/page/Page';
import { useAtom } from 'jotai';
import { user } from '../../services/user/user';
import { imagesService, useDbRequest, vehiclesService } from '../../packages/database';
import { useEffect, useState, useRef } from 'react';
import { useDeleteUpload, useRSelection } from '../../packages/database/features/utils/utilityHooks';
import { FS } from '../../packages/filesystem';
// import { useNavigation } from 'react-router-dom';
import FooterAddVehicle from '../../components/page/pageMainComponents/footers/FooterAddVehicle';
import AdedVehiclesSearchItem from './searchVehicle/adedVehicleSearch/AdedVehiclesSearchItem';
import FooterDeleteUpload from '../../components/page/pageMainComponents/footers/FooterDeleteUpload';
import './vehiclePage.scss';

import ItemWIthPhoto from '../../components/vehicleComponents/hotspotsComponents/ItemWIthPhoto';
import FileUploader from '../../components/uploader/FileUploader';

import VehicleItem from '../../components/vehicleComponents/hotspotsComponents/VehicleItem';

const VehiclePage = (props) => {
    const dbRequest = useDbRequest();
    const userInfo = useAtom(user.userDetails);
    const [setCurrentSelection, getCurrentSelection] = useRSelection();
    const [showCheckbox, setShowCheckbox] = useState(false);
    const [cars, setCars] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const elementsRef = useRef([]);
    const [uploading, setUploading] = useState(false);
    const [elementsForUpload, setElementsForUpload] = useState([]);
    // const [selectableItems, setSelectableItems] = useState(false);
    const [presentAlert] = useIonAlert();

    useEffect(() => {
        (async () => {
            const cars = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesWithPics([getCurrentSelection().dealership_id]));
            setCars(cars);
            // console.log(getCurrentSelection().refreshPage, 'refresh page')
        })();
        console.log('refresh+++++++++++++')
        deselectAll();
    }, [getCurrentSelection().refreshPage]);



    const setCheckValues = () => {
        console.log('setCheckValues')
        let allChecked = true;

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
        console.log('deselectAll')
        if (showCheckbox) {
            elementsRef.current = elementsRef.current?.filter(element => element !== null);
            elementsRef.current?.forEach(element => {
                element.querySelector('ion-checkbox').checked = false;
            });
        }
    };

    const editVehicleHandler = () => {
        console.log('editVehicleHandler')
        deselectAll();
        setShowCheckbox(!showCheckbox);
    };



    const deleteVehicleHandler = async () => {
        elementsRef.current = elementsRef.current.filter(element => element !== null);
        const selectedVehicles = elementsRef.current.filter(element => element.querySelector('ion-checkbox').checked);
        if (selectedVehicles.length) {
            presentAlert({
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
            presentAlert({
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
    };

    const uploadVehicleHandler = () => {
        elementsRef.current = elementsRef.current.filter(element => element !== null);
        let forUpload = [];
        elementsRef.current.forEach(element => {
            if (element.querySelector('ion-checkbox').checked) {
                forUpload.push(parseInt(element.id));
            }
        });
        console.log(forUpload);
        setElementsForUpload(forUpload);
        setUploading(true);
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
                            {showCheckbox ? <IonButton onClick={editVehicleHandler}>Cancel</IonButton> :
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
                                        // car={true}
                                        showCheckbox={showCheckbox}
                                        setShowCheckbox={setShowCheckbox}
                                    // image={car.image}
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


// const dbRequest = useDbRequest();
    // const [carsWithPics, setCarsWithPics] = useState([]);
    // const [, getCurrentSelection] = useRSelection();
    // const [userInfo] = useAtom(user.userDetails);
    // const [showCheckbox, setShowCheckbox] = useState(false);
    // const [checkedElements, setCheckedElements] = useState({});
    // const [checkAll, setCheckAll] = useState(false);
    // const delUpload = useDeleteUpload();
    // // const locationRefresh = useLocation();
    // const [refresh, setRefresh] = useState(true);
    // // const refresh = useRef(true);
    // const elementsRef = useRef([]);
    // const history = useHistory();
    // const [state, setState] = useState(props.location.state);

    // if (props.location.state !== state) { setRefresh(true); setState(props.location.state) };

    // const editVehicleHandler = () => {
    //     setShowCheckbox(!showCheckbox);
    // }

    // const changeCheckedElements = (element) => {
    //     setCheckedElements({ ...checkedElements, ...element });
    // }

    // const deleteVehicleHandler = async () => {
    //     const collectedVehicles = getCheckValues();
    //     const collectedVehicleIds = sortVehicles(collectedVehicles);
    //     console.log("collectedVehicles: red", collectedVehicleIds);
    //     await Promise.all(
    //         collectedVehicleIds?.map(async (vehicle_id) => {
    //             console.log("vehicle_id: ", vehicle_id);
    //             let pictures = await dbRequest.requestFunction(async () => await imagesService.getAllImagesByVehicleId([vehicle_id]));
    //             console.log("pictures: ", pictures);
    //             let deletedStatus = await Promise.all(
    //                 pictures?.map(async (picture) => {
    //                     return await dbRequest.requestFunction(async () => await imagesService.deleteImageById([picture.image_id]))
    //                 })
    //             )

    //             if (deletedStatus?.every((status) => status === true)) {
    //                 console.log("deletedStatus: ", deletedStatus);
    //                 await dbRequest.requestFunction(async () => await vehiclesService.deleteVehicleById([vehicle_id]));
    //                 console.log(vehicle_id, " was deleted");
    //             }
    //             return null;
    //         }));
    //     setRefresh(true);
    //     setCheckValues(false);
    // }

    // const uploadVehicleHandler = async () => {
    //     const collectedVehicles = getCheckValues();
    //     const collectedVehicleIds = sortVehicles(collectedVehicles);
    //     console.log("collectedVehicles: upload", collectedVehicleIds);
    //     // const collectedVehicleIds = sortVehicles(checkedElements);
    //     let x = await Promise.all(collectedVehicleIds?.map(async (vehicle_id) => {
    //         const pictures = await dbRequest.requestFunction(async () => await imagesService.getAllImagesByVehicleId([vehicle_id]));
    //         let x = await Promise.all(
    //             pictures?.map(async (picture) => {
    //                 console.log("picture: ", picture);
    //                 let result = await delUpload.uploadImage(picture);
    //                 console.log("result: ", result);
    //                 return result;
    //             })
    //         )
    //         console.log(x, "request.onreadystatechange")
    //         await dbRequest.requestFunction(async () => await vehiclesService.deleteVehicleById([vehicle_id]));
    //         return true;
    //     }));
    //     console.log(x, "wtf?")
    //     // console.log(x, "wtf?")
    //     setRefresh(true);
    // }


    // const sortVehicles = (elements) => {
    //     const selectedElements = [];
    //     Object.keys(elements).forEach((key) => {
    //         if (elements[key]) {
    //             selectedElements.push(parseInt(key));
    //         }
    //     });
    //     return selectedElements;
    // }

    // const getCheckValues = () => {
    //     const checkElements = {};
    //     // console.log(elementsRef.current, "elementsRef.current")
    //     if (elementsRef.current[elementsRef.current.length - 1] === null) {
    //         elementsRef.current.pop();
    //     }
    //     elementsRef.current?.map((element, index) => {
    //         if (element !== null) {
    //             checkElements[element.data?.vehicle_id] = element.querySelector('ion-checkbox').checked;
    //         }
    //         // console.log(checkElements[element.data.vehicle_id] = element.querySelector('ion-checkbox').checked, "checkElements")
    //         return null;
    //     });
    //     return checkElements;
    // }

    // const setCheckValues = (bull) => {
    //     let newCheckValues;
    //     if (bull !== true || bull !== false) {
    //         if (Object.values(getCheckValues()).includes(false)) {
    //             newCheckValues = true;
    //         } else {
    //             newCheckValues = false;
    //         }
    //         console.log('bull === undefined')
    //     } else {
    //         newCheckValues = bull;
    //         console.log('bull =!!!!!= undefined')
    //     }

    //     while (elementsRef.current[elementsRef.current.length - 1] === null) {
    //         elementsRef.current.pop();
    //     }
    //     console.log(newCheckValues, "newCheckValues")
    //     elementsRef.current?.map((element, index) => {
    //         element.querySelector('ion-checkbox').checked = newCheckValues;
    //         return null;
    //     });
    // }

    // const getAllPicturesForEachVehicle = async (vehicles) => {
    //     console.log(vehicles, "vehicles");
    //     return await Promise.all(vehicles.map(async (vehicle) => {
    //         return await dbRequest.requestFunction(async () => await imagesService.getAllImagesByVehicleId([vehicle]));
    //     }));
    // }

    // useEffect(() => {
    //     if (refresh) {
    //         (async () => {
    //             const cars = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesWithPics([getCurrentSelection().dealership_id]));
    //             setCarsWithPics(cars);

    //             console.log(cars, "cars activated");
    //         })();
    //         console.log(state, "state", refresh, "refresh", props.location.state, "props.location.state")
    //         setRefresh(false);
    //         // console.log(history.location.pathname, "history.location")
    //     }
    //     // return () => {
    //     //     console.log("unmounted");
    //     //     setCarsWithPics([]);
    //     // }
    //     // console.log(locationRefresh, "locationRefresh")
    // }, [refresh]);

    // // useIonViewDidEnter(() => {
    // //     console.log("ionViewDidEnter");
    // //     setRefresh(true);
    // // });