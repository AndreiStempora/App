import { IonList, IonTitle, IonButtons, IonButton, IonItem, IonIcon, IonLabel, IonCheckbox, useIonViewWillEnter } from '@ionic/react';
import { Page, CustomHeader, CustomContent, CustomFooter } from '../../../components/page/Page';
import { useAtom } from 'jotai';
import { user } from '../../../services/user/user';
import { imagesService, useDbRequest, vehiclesService } from '../../../packages/database';
import { useEffect, useState, useRef } from 'react';
import { useDeleteUpload, useRSelection } from '../../../packages/database/features/utils/utilityHooks';
import { FS } from '../../../packages/filesystem';
import FooterAddVehicle from '../../../components/footers/FooterAddVehicle';
import AdedVehiclesSearchItem from './adedVehicleSearch/AdedVehiclesSearchItem';
import FooterDeleteUpload from '../../../components/footers/FooterDeleteUpload';
import ItemWithPhoto from '../../../components/vehicleComponents/hotspotsComponents/ItemWithPhoto';
import './vehiclePage.scss';
// import ItemWithPhoto from '../../../components/vehicleComponents/hotspotsComponents/ItemWithPhoto';


const VehiclePage = () => {
    const dbRequest = useDbRequest();
    const [userInfo] = useAtom(user.userDetails);
    const [showCheckbox, setShowCheckbox] = useState(false);
    const [addedVehicles, setAddedVehicles] = useState([]);
    const elementsRef = useRef([]);
    const [refresh, setRefresh] = useState(false);
    const [setUserSelection, getCurrentSelection] = useRSelection();
    const delUp = useDeleteUpload();

    const getAddedVehicles = async () => {
        const vehicles = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesWithPics([getCurrentSelection().dealership_id]))
        setAddedVehicles(vehicles);
    }

    const getCheckValues = () => {
        const checkElements = {};
        elementsRef.current?.map((element, index) => {
            checkElements[element.data.vehicle_id] = element.querySelector('ion-checkbox').checked;
            return null;
        });
        return checkElements;
    }

    const setCheckValues = () => {
        let newCheckValues;
        if (Object.values(getCheckValues()).includes(false)) {
            newCheckValues = true;
        } else {
            newCheckValues = false;
        }
        elementsRef.current?.map((element, index) => {
            element.querySelector('ion-checkbox').checked = newCheckValues;
            return null;
        });
    }

    const selectAllHandler = () => {
        setCheckValues();
    }

    const findFirstImageOfCurrentVehicle = (vehicleId) => {
        (async () => {

        })();
    }

    const getAllPicturesForSelectedVehicles = async () => {
        //start a timer
        const start = new Date().getTime();
        const selectedVehicles = getCheckValues();
        console.log(selectedVehicles, 'selectedValues')
        //find all keys with true value
        const selectedVehiclesKeys = Object.keys(selectedVehicles).filter(key => selectedVehicles[key]);
        console.log(selectedVehiclesKeys, 'selectedVehiclesKeys')
        const allFoundPictures = [];
        //get all pictures for selected vehicles
        let x = await Promise.all(selectedVehiclesKeys.map(async (vehicleId) => {
            const vehiclePictures = await dbRequest.requestFunction(async () => await imagesService.getAllImagesByVehicleId([parseInt(vehicleId)]));
            console.log(vehiclePictures, 'vehiclePictures')
            return vehiclePictures
        }))
            .then((values) => {
                //stop timer    
                console.log(values, 'values')
                const end = new Date().getTime();
                console.log(end - start, 'time')

            });


    }
    const editVehicleHandler = () => { setShowCheckbox(!showCheckbox) }

    const deleteVehiclesHandler = async () => {
        await getAllPicturesForSelectedVehicles();
        setRefresh(true);
    }
    const uploadVehiclesHandler = async () => {
        await getAllPicturesForSelectedVehicles();
        setRefresh(true);
    }

    useEffect(() => {
        (async () => {
            await getAddedVehicles();
        })();
        console.log("rendered")
        return () => {
            setRefresh(false);
        }
    }, [refresh]);

    return (
        <Page pageClass={'vehiclesSearch'}>
            <CustomHeader>
                <IonButtons slot="start" >
                    {showCheckbox ? <IonButton onClick={() => setShowCheckbox(false)}>Cancel</IonButton> :
                        <IonButton defaultHref="/profile" >
                            {userInfo.avatar ? <img src={userInfo.avatar} alt="avatar" /> : <IonIcon icon='/assets/svgs/user.svg' />}
                        </IonButton>
                    }
                </IonButtons>

                <IonTitle className='ion-text-center'>Vehicles Page</IonTitle>
                <IonButtons slot="end" >
                    <IonButton onClick={showCheckbox ? selectAllHandler : editVehicleHandler}>
                        {showCheckbox ? <IonIcon icon='/assets/svgs/SelectAll.svg' /> : <IonIcon icon='/assets/svgs/edit1.svg'></IonIcon>}
                    </IonButton>
                </IonButtons>
            </CustomHeader>
            <CustomContent colSizesArr={[[12]]}>
                <IonList>
                    {addedVehicles?.map((car, index) =>
                        <ItemWithPhoto
                            ref={(element) => elementsRef.current[index] = element}
                            key={index}
                            item={car}
                            image={(async () => {
                                return (await dbRequest.requestFunction(async () => await imagesService.getAllImagesByVehicleId([car.vehicle_id])))[0];
                            })()}
                            showCheckbox={showCheckbox}
                            car={true}
                        />


                    )}
                </IonList>

            </CustomContent>
            {!showCheckbox ? <FooterAddVehicle></FooterAddVehicle> :
                <FooterDeleteUpload
                    del={deleteVehiclesHandler}
                    retake={null}
                    upload={uploadVehiclesHandler}
                ></FooterDeleteUpload>
            }
        </Page>
    )
}

export default VehiclePage;