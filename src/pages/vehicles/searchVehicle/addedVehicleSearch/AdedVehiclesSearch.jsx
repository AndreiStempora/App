// import { IonList } from "@ionic/react";
// import { useState, useEffect } from "react";
// import { useRSelection } from "../../../../packages/database/features/utils/utilityHooks";
// import { useDbRequest, vehiclesService } from "../../../../packages/database";
// import AdedVehiclesSearchItem from "./AdedVehiclesSearchItem";


// const AdedVehiclesSearch = ({showCheckbox}) => {
//     const dbRequest = useDbRequest();
//     const [carsWithPics, setCarsWithPics] = useState([]);
//     const [, getCurrentSelection] = useRSelection();

//     useEffect(() => {
//         (async () => {
//             const cars = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesWithPics([getCurrentSelection.dealership_id]));
//             setCarsWithPics(cars);
//             console.log(cars, 'cars');
//         })();
//     }, []);

//     return (
//             <IonList>
//                 {carsWithPics?.map((car,index) => <AdedVehiclesSearchItem key={index} showCheckbox={showCheckbox} car={car}></AdedVehiclesSearchItem>)}
//             </IonList>
//     )
// }

// export default AdedVehiclesSearch