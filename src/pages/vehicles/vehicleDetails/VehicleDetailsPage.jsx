import { IonBackButton, IonButtons, IonLabel, IonTitle, IonButton, IonIcon } from "@ionic/react";
import { Page, CustomHeader, CustomContent } from "../../../components/page/Page";
import { useHistory } from "react-router";
import { useDbRequest, vehiclesService, imagesService, hotspotsService } from "../../../packages/database";
import { useEffect, useState } from "react";
import { useRSelection } from "../../../packages/database/features/utils/utilityHooks";
import FooterAddVehicle from "../../../components/footers/FooterAddVehicle";
import './vehicleDetails.scss';

const VehicleDetails = () => {
    const dbRequest = useDbRequest();
    const history = useHistory();
    const [setCurrentSelection, getCurrentSelection] = useRSelection();
    const [vehicle, setVehicle] = useState({});
    const [interiorHotspots, setInteriorHotspots] = useState([]);
    const [exteriorHotspots, setExteriorHotspots] = useState([]);
    const [interiorPictures, setInteriorPictures] = useState([]);
    const [exteriorPictures, setExteriorPictures] = useState([]);

    const separateHotspots = (hotspots) => {
        const interior = [];
        const exterior = [];
        hotspots.forEach(hotspot => {
            if(hotspot.hotspot_type === 1){
                interior.push(hotspot);
            } else {
                exterior.push(hotspot);
            }
        });
        setExteriorHotspots(exterior);
        setInteriorHotspots(interior);
    }

    const getPicturesFromHotspots = (hotspots) => {
        const pictures = [];
        hotspots.map(async(hotspot) => {
            const pic = await dbRequest.requestFunction(async ()=> imagesService.getImageByVehicleIdAndHotspotId([getCurrentSelection().vehicle_id, hotspot.hotspot_id])) ;
            pictures.push(pic);
        })
        return pictures;
    }

    useEffect(() => {
        (async () => {
            const hotspots = await dbRequest.requestFunction(async () => await hotspotsService.getAllHotspotsByDealershipId([getCurrentSelection().dealership_id]));
            separateHotspots(hotspots);
            const intPics = getPicturesFromHotspots(interiorHotspots);
            const extPics = getPicturesFromHotspots(exteriorHotspots);
            setInteriorPictures(intPics);
            setExteriorPictures(extPics);
            // const photoSlots = await dbRequest.requestFunction(async () => await imagesService.getAllImagesByVehicleId([currentSelection.vehicle_id]));
            const vehicle = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleById([getCurrentSelection().vehicle_id]));
            setVehicle(vehicle);
            // console.log(hotspots);
        })();

        
    }, []);

    const goToPhotosHandler = (type) => {
        setCurrentSelection({hotspot_type: type});
        history.push('/vehicle-photos');
    }

    return (
        <Page pageClass={'vehicleDetails'}>
            <CustomHeader>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/dealerships" icon="assets/svgs/previous.svg"></IonBackButton>
                </IonButtons>
                <IonTitle className='ion-text-center'>Vehicle Details</IonTitle>
            </CustomHeader>
            <CustomContent colSizesArr={[12, 12]}>
                <div className="">
                    <IonLabel>
                        <h3>Vehicle: {vehicle.vehicle_make} {vehicle.vehicle_model}</h3>
                        <h3>VIN: {vehicle.vehicle_vin}</h3>
                    </IonLabel>
                </div>
                <>
                    <IonButtons className="camera-buttons">
                        <IonButton onClick={()=>{goToPhotosHandler(1)}}>
                            <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon>
                            <IonLabel>
                                <h2>Interior</h2>
                                <h3>{interiorPictures.length} / {interiorHotspots.length}</h3>
                            </IonLabel>
                        </IonButton>
                        <IonButton onClick={()=>{goToPhotosHandler(3)}}>
                            <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon>
                            <IonLabel>Individual</IonLabel>
                        </IonButton>
                        <IonButton onClick={()=>{goToPhotosHandler(2)}}>
                            <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon>
                            <IonLabel>
                                <h2>Exterior</h2>
                                <h3>{exteriorPictures.length} / {exteriorHotspots.length}</h3>
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

export default VehicleDetails;