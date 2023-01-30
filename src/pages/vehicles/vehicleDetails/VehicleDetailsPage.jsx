import { IonBackButton, IonButtons, IonItem, IonLabel, IonTitle, IonButton, IonIcon, useIonViewWillEnter, useIonAlert, useIonViewDidEnter } from "@ionic/react";
import { Page, CustomHeader, CustomContent } from "../../../components/page/Page";
import { useHistory, useLocation } from "react-router";
import { useDbRequest, vehiclesService, imagesService } from "../../../packages/database";
import { useEffect, useRef, useState } from "react";
import { useRSelection } from "../../../packages/database/features/utils/utilityHooks";
import FooterAddVehicle from "../../../components/page/pageMainComponents/footers/FooterAddVehicle";
import { useHotspot } from "../../../packages/database/features/utils/utilityHooks";
import CustomBackButton from "../../../components/buttons/CustomBackButton";
import './vehicleDetails.scss';

const VehicleDetailsPage = () => {
    const dbRequest = useDbRequest();
    const history = useHistory();
    const hotspotHook = useHotspot();
    const [setCurrentSelection, getCurrentSelection] = useRSelection();
    const [vehicle, setVehicle] = useState({});
    const [elements, setElements] = useState({});
    const [presentAlert] = useIonAlert();
    // const refreshX = useRef(true);
    // const [refresh, setRefresh] = useState(true);
    // let refresh = true;
    // const location = useLocation();

    const getPicturesFromHotspots = async (hotspots) => {
        return await Promise.all(
            hotspots.map(async (hotspot) => {
                let x = await dbRequest.requestFunction(async () => imagesService.getImageByVehicleIdAndHotspotId([getCurrentSelection().vehicle_id, hotspot.hotspot_id]));
                if (x.length > 0) {
                    console.log(x, 'x');
                    return x[0];
                } else {
                    return null;
                }
            })
        )
    }

    const getPictureCount = async (hotspots) => {
        let counter = 0;
        hotspots.map(async (hotspot) => {
            if (hotspot.length === 2) {
                counter++;
            }
        })
        return counter;
    }

    useEffect(() => {
        (async () => {
            console.log('vehicle details page');
            const interior = await hotspotHook.getHotspotsWithPhotos(1);
            const exterior = await hotspotHook.getHotspotsWithPhotos(2);
            const interiorPhotos = await getPictureCount(interior);
            const exteriorPhotos = await getPictureCount(exterior);
            const vehicle = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleById([getCurrentSelection().vehicle_id]));
            const elements2 = {
                interior: interior,
                exterior: exterior,
                interiorPhotos: interiorPhotos,
                exteriorPhotos: exteriorPhotos,
                vehicle: vehicle
            };
            setElements(elements2);
        })();
    }, [getCurrentSelection().vehicle_id, getCurrentSelection().refreshPage]);



    const goToPhotosHandler = (type) => {
        setCurrentSelection({ hotspot_type: type, refreshPage: !getCurrentSelection().refreshPage });
        history.push('/vehicle-photos');
    }

    const addVehicleNameHandler = () => {
        presentAlert({
            header: 'Add Car Name',
            buttons: [
                { text: 'Cancel', role: 'cancel' },
                {
                    text: 'Add',
                    handler: async (data) => {
                        console.log(data);
                        await dbRequest.requestFunction(async () => await vehiclesService.updateVehicleMakeAndModelById([getCurrentSelection().vehicle_id, data[0], data[1]]));
                        const vehicle = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleById([getCurrentSelection().vehicle_id]));
                        setElements({ ...elements, vehicle: vehicle });
                    }
                }
            ],
            inputs: [
                {
                    placeholder: 'Maker name',
                    value: elements.vehicle?.vehicle_make
                },
                {
                    placeholder: 'Car model',
                    value: elements.vehicle?.vehicle_model
                }
            ],
        })
    }

    const goBackToVehiclesPageHandler = () => {
        setCurrentSelection('refresh');
        history.push('/vehicle-search');
    }

    return (
        <Page pageClass={'vehicleDetails'}>
            <CustomHeader>
                <IonButtons slot="start">
                    <CustomBackButton
                        extraFunction={goBackToVehiclesPageHandler}
                    />
                </IonButtons>
                <IonTitle className='ion-text-center'>Vehicle Details</IonTitle>
            </CustomHeader>
            <CustomContent colSizesArr={[12, 12]}>
                <div className="">
                    <IonItem lines="none" className="vehicle-name">
                        <h3>Vehicle: {elements.vehicle?.vehicle_make} {elements.vehicle?.vehicle_model}</h3>
                        <IonButton fill='clear' slot="end" onClick={addVehicleNameHandler}><IonIcon icon='/assets/svgs/edit1.svg'></IonIcon></IonButton>
                    </IonItem>
                    <IonLabel>

                        <h3>VIN: {elements.vehicle?.vehicle_vin}</h3>
                    </IonLabel>
                </div>
                <>
                    <IonButtons className="camera-buttons">
                        <IonButton onClick={() => { goToPhotosHandler(1) }}>
                            <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon>
                            <IonLabel>
                                <h2>Interior</h2>
                                <h3>{elements?.interiorPhotos} / {elements?.interior?.length}</h3>
                            </IonLabel>
                        </IonButton>
                        <IonButton onClick={() => { goToPhotosHandler(3) }}>
                            <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon>
                            <IonLabel>Individual</IonLabel>
                        </IonButton>
                        <IonButton onClick={() => { goToPhotosHandler(2) }}>
                            <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon>
                            <IonLabel>
                                <h2>Exterior</h2>
                                <h3>{elements.exteriorPhotos} / {elements.exterior?.length}</h3>
                            </IonLabel>
                        </IonButton>
                    </IonButtons>
                    <div className="car-image">
                        <img src="/assets/img/car-outline.png" alt="car placeholder" />
                    </div>
                </>
            </CustomContent>
            <FooterAddVehicle />
        </Page>
    )
}

export default VehicleDetailsPage;