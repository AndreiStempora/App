import { IonSearchbar, IonLabel, IonList } from "@ionic/react";
import {useDbRequest, vehiclesService } from "../../../packages/database";
import { useState, useEffect } from "react";
import { useAtom } from 'jotai';
import { user } from '../../../services/user/user';
import AdedVehiclesSearchItem from "./AdedVehiclesSearchItem";


const AdedVehiclesSearch = ({showCheckbox}) => {
    const dbRequest = useDbRequest();
    const [carsWithPics, setCarsWithPics] = useState([]);
    const [currentDealership] = useAtom(user.userSelectedDealership);

    useEffect(() => {
        (async () => {
            const cars = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesWithPics([currentDealership]));
            setCarsWithPics(cars);
        })();
    }, [carsWithPics]);

    return (
            <IonList>
                {carsWithPics?.map((car,index) => <AdedVehiclesSearchItem key={index} showCheckbox={showCheckbox} car={car}></AdedVehiclesSearchItem>)}
            </IonList>
    )
}

export default AdedVehiclesSearch