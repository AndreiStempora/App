import { useIonViewWillEnter, IonList, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { Page, CustomHeader, CustomContent } from '../../../components/page/Page';
import { useAtom } from 'jotai';
import { user } from '../../../services/user/user';
import { useEffect, useState } from 'react';
import { useDbRequest, vehiclesService } from '../../../packages/database';
import { useRSelection } from '../../../packages/database/features/utils/utilityHooks';
import FooterAddVehicle from '../../../components/footers/FooterAddVehicle';
import FooterDeleteUpload from '../../../components/footers/FooterDeleteUpload';
import AdedVehiclesSearchItem from '../../../components/vehicleComponents/adedVehicleSearch/AdedVehiclesSearchItem';
import './vehiclePage.scss';


const VehiclePage = () => {
    const dbRequest = useDbRequest();
    const [carsWithPics, setCarsWithPics] = useState([]);
    const [, getCurrentSelection] = useRSelection();
    const [userInfo] = useAtom(user.userDetails);
    const [showCheckbox, setShowCheckbox] = useState(false);

    const editVehicleHandler = () => {
        setShowCheckbox(!showCheckbox);
    }
    
    useIonViewWillEnter(() => {
        (async () => {
            const cars = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesWithPics([getCurrentSelection().dealership_id]));
            setCarsWithPics(cars);
        })();
    });
    
    useEffect(() => {
    }, []);

    return (
        <Page pageClass={'vehiclesSearch'}>
            <CustomHeader>
                <IonButtons slot="start" >
                    <IonButton defaultHref="/profile" >
                        {userInfo.avatar ? <img src={userInfo.avatar} alt="avatar" /> : <IonIcon icon='/assets/svgs/user.svg' />}
                    </IonButton>
                </IonButtons>

                <IonTitle className='ion-text-center'>Vehicles Page</IonTitle>
                <IonButtons slot="end" >
                    <IonButton onClick={editVehicleHandler}>
                        {showCheckbox ? <IonIcon icon='/assets/svgs/SelectAll.svg' /> : <IonIcon icon='/assets/svgs/edit1.svg'></IonIcon>}

                    </IonButton>
                </IonButtons>
            </CustomHeader>

            <CustomContent colSizesArr={[12]}>
                {/* <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.target.value)} setClearButton="focus"></IonSearchbar> */}
                {/* <AdedVehiclesSearch showCheckbox={showCheckbox}></AdedVehiclesSearch> */}
                <IonList>
                    {carsWithPics?.map((car, index) => <AdedVehiclesSearchItem key={index} showCheckbox={showCheckbox} car={car}></AdedVehiclesSearchItem>)}
                </IonList>
            </CustomContent>
            {showCheckbox ? <FooterDeleteUpload /> : <FooterAddVehicle></FooterAddVehicle>}
            {/* <FooterAddVehicle/> */}
        </Page>

    )
}

export default VehiclePage;