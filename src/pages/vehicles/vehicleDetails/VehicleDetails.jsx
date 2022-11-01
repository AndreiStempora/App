import { IonBackButton, IonButtons, IonLabel, IonTitle, IonButton, IonIcon } from "@ionic/react";
import FooterAddVehicle from "../../../components/footers/FooterAddVehicle";
import { Page, CustomHeader, CustomContent, CustomFooter } from "../../../components/page/Page";
import { useHistory } from "react-router";
import { useAtom } from "jotai";
import { user } from '../../../services/user/user';
import { useDbRequest, vehiclesService, imagesService, hotspotsService } from "../../../packages/database";
import { useEffect, useState } from "react";
import './vehicleDetails.scss';

const VehicleDetails = (props) => {
    const dbRequest = useDbRequest();
    const history = useHistory();
    const [currentSelection, setCurrentSelection] = useAtom(user.userCurrentSelections);
    const [vehicle, setVehicle] = useState({});
    const [interiorHotspots, setInteriorHotspots] = useState([]);
    const [exteriorHotspots, setExteriorHotspots] = useState([]);

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
        return [interior, exterior];
    }

    useEffect(() => {
        (async () => {
            const hotspots = await dbRequest.requestFunction(async () => await hotspotsService.getAllHotspotsByDealershipId([currentSelection.dealership_id]));
            const hots = separateHotspots(hotspots);
            setExteriorHotspots(hots[1]);
            setInteriorHotspots(hots[0]);
            // console.log(x,interiorHotspots, exteriorHotspots);
            const photoSlots = await dbRequest.requestFunction(async () => await imagesService.getAllImagesByVehicleId([currentSelection.vehicle_id]));
            const vehicle = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleById([currentSelection.vehicle_id]));
            setVehicle(vehicle);
            console.log(hotspots);
        })();

        
    }, []);

    const goToPhotosHandler = (type) => {
        setCurrentSelection({...currentSelection, photoSlots: type});
        history.push('/vehicle-photos');
    }

    return (
        <Page pageClass={'vehicleDetails'}>
            <CustomHeader>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/dealerships" icon="assets/svgs/previous.svg"></IonBackButton>
                </IonButtons>
                <IonTitle className='ion-text-center'>Vehicle</IonTitle>
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
                                <h3> / {interiorHotspots.length}</h3>
                            </IonLabel>
                        </IonButton>
                        <IonButton onClick={goToPhotosHandler}>
                            <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon>
                            <IonLabel>Individual</IonLabel>
                        </IonButton>
                        <IonButton onClick={()=>{goToPhotosHandler(2)}}>
                            <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon>
                            <IonLabel>
                                <h2>Exterior</h2>
                                <h3> / {exteriorHotspots.length}</h3>
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