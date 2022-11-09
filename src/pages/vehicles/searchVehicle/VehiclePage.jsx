import { useIonViewWillEnter, IonList, IonTitle, IonButtons, IonButton, IonItem, IonIcon, IonLabel, IonCheckbox } from '@ionic/react';
import { Page, CustomHeader, CustomContent, CustomFooter } from '../../../components/page/Page';
import { useAtom } from 'jotai';
import { user } from '../../../services/user/user';
import { useEffect, useState } from 'react';
import { useDbRequest, vehiclesService } from '../../../packages/database';
import { useRSelection } from '../../../packages/database/features/utils/utilityHooks';
import FooterAddVehicle from '../../../components/footers/FooterAddVehicle';
import AdedVehiclesSearchItem from './adedVehicleSearch/AdedVehiclesSearchItem';
import './vehiclePage.scss';


const VehiclePage = () => {
    const dbRequest = useDbRequest();
    const [carsWithPics, setCarsWithPics] = useState([]);
    const [, getCurrentSelection] = useRSelection();
    const [userInfo] = useAtom(user.userDetails);
    const [showCheckbox, setShowCheckbox] = useState(false);
    const [checkedElements, setCheckedElements] = useState({});
    const [checkAll,setCheckAll] = useState(false);

    const editVehicleHandler = () => {
        setShowCheckbox(!showCheckbox);
    }

    const changeCheckedElements = (element)=>{
        setCheckedElements({...checkedElements, ...element});
    }
    
    useIonViewWillEnter(() => {
        (async () => {
            const cars = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesWithPics([getCurrentSelection().dealership_id]));
            setCarsWithPics(cars);
        })();
    });

    const deleteVehicleHandler = async () => {
        console.log("delete: " , checkedElements);
    }

    const uploadVehicleHandler = async () => {
        console.log("upload: " , checkedElements);
    }

    const selectAllHandler = () => {
        setCheckAll(!checkAll);
        const newCheckedElements = {};
        carsWithPics.forEach((car)=>{
            newCheckedElements[car.vehicle_id] = !checkAll;
        });
        setCheckedElements(newCheckedElements);
    }

    useEffect(() => {
        (async () => {
            const cars = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesWithPics([getCurrentSelection().dealership_id]));
            setCarsWithPics(cars);
            console.log(cars, 'carsWithPics');
        })();
    }, []);

    return (
        <Page pageClass={'vehiclesSearch'}>
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
                    <IonButton onClick={showCheckbox ? selectAllHandler : editVehicleHandler}>
                        {showCheckbox ? <IonIcon icon='/assets/svgs/SelectAll.svg' /> : <IonIcon icon='/assets/svgs/edit1.svg'></IonIcon>}

                    </IonButton>
                </IonButtons>
            </CustomHeader>
            <CustomContent colSizesArr={[[12]]}>
                    <IonList>
                        {carsWithPics?.map((car, index) => 
                            <AdedVehiclesSearchItem 
                                key={index} 
                                car={car} 
                                showCheckbox={showCheckbox} 
                                checkAll={checkAll}
                                setCheckedElements={changeCheckedElements}
                            ></AdedVehiclesSearchItem>)}
                    </IonList>
                
            </CustomContent>
            {!showCheckbox ? <FooterAddVehicle></FooterAddVehicle> : 
                <CustomFooter>
                    <IonButtons>
                        <IonButton className='icon-over-text' onClick={deleteVehicleHandler}>
                            <div className="container">
                                <IonIcon icon='/assets/svgs/delete.svg'></IonIcon>
                                <IonLabel>delete</IonLabel>
                            </div>
                        </IonButton> 
                        <IonButton className='icon-over-text' onClick={uploadVehicleHandler}>
                            <div className="container">
                                <IonIcon icon='/assets/svgs/upload.svg'></IonIcon>
                                <IonLabel>upload</IonLabel>
                            </div>
                        </IonButton>
                    </IonButtons>
                </CustomFooter>}
        </Page>
    )
}

export default VehiclePage;