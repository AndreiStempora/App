import { IonBackButton, IonButtons, IonLabel, IonTitle, IonButton, IonIcon } from "@ionic/react";
import { Page, CustomHeader, CustomContent } from "../../../components/page/Page";
import { useHistory } from "react-router";
import { useDbRequest, vehiclesService, imagesService } from "../../../packages/database";
import { useEffect, useState } from "react";
import { useRSelection } from "../../../packages/database/features/utils/utilityHooks";
import FooterAddVehicle from "../../../components/footers/FooterAddVehicle";
import { useHotspot } from "../../../packages/database/features/utils/utilityHooks";
import './vehicleDetails.scss';

const VehicleDetails = () => {
    const dbRequest = useDbRequest();
    const history = useHistory();
    const [getAllHotspots] = useHotspot();
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

    const getPicturesFromHotspots = async(hotspots) => {
        let pictures = 0;
        await Promise.all(
            hotspots.map(async(hotspot) => {
                const pic = await dbRequest.requestFunction(async ()=> imagesService.getImageByVehicleIdAndHotspotId([getCurrentSelection().vehicle_id, hotspot.hotspot_id]));
                if(pic[0] !== undefined){
                    pictures++;
                }
                return true;
            })
        )
        return pictures;
    }

    useEffect(() => {
        (async () => {
            const hotspots = await getAllHotspots();
            separateHotspots(hotspots);
            const intPics = await getPicturesFromHotspots(interiorHotspots);
            const extPics = await getPicturesFromHotspots(exteriorHotspots);
            setInteriorPictures(intPics);
            setExteriorPictures(extPics);
            const vehicle = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleById([getCurrentSelection().vehicle_id]));
            setVehicle(vehicle);
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
                                <h3>{interiorPictures} / {interiorHotspots.length}</h3>
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
                                <h3>{exteriorPictures} / {exteriorHotspots.length}</h3>
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