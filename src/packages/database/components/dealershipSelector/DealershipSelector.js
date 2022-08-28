import './dealershipSelector.scss'
import { IonGrid, IonRow, IonCol, IonList,IonItem } from '@ionic/react';
import DealershipElement from './DealershipElement';
import { useState, useEffect } from 'react';
import { DB, useDbRequest, dealershipsService, vehiclesService } from "../../";


const DealershipSelector = ({dealerships, inventory}) => {
	const dbRequest = useDbRequest();
	const [dealershipElements , setDealershipElements] = useState([]);

	const simplifiedArray = async (arr)=>{
		try{
			return await Promise.all(arr?.map(async (dealership)=>{
					let logoBlob = await (await fetch(dealership.logo)).blob();
					const base64string = await DB.blobToBase64(logoBlob);
					return {id: parseInt(dealership.id), dealer: dealership.dealer, logo: base64string};
				})
			)
		} catch(e){
			console.log(e);
		}
	}

	useEffect(() => {
		console.log(inventory,'inventory');
		//start db
		// DB.dbInstance().then(async (db)=>{
		// 	return await dbRequest.requestFunction(async ()=> await dealershipsService.getAllDealerships())	
		// }).then(async (localDealerships)=>{

		// 	if(dealerships){
		// 		const simplifiedDealerships = await simplifiedArray(dealerships);	

		// 		await dbRequest.requestFunction(()=>dealershipsService.updateLocalDealerships(simplifiedDealerships))

		// 		localDealerships = await dbRequest.requestFunction(()=>dealershipsService.getAllDealerships());
		// 		// console.log(localDealerships, "localDealerships");
		// 	}
			
		// 	let localInventory = await dbRequest.requestFunction(()=>vehiclesService.getAllVehicles());
		// 	if(inventory){
		// 		await dbRequest.requestFunction(()=>vehiclesService.updateLocalVehicles(inventory));
		// 		localInventory = await dbRequest.requestFunction(()=>vehiclesService.getAllVehicles());
		// 		console.log(localInventory, "localInventory");
		// 	}
		// 	return await localDealerships;
			
		// }).then((localDealerships)=>{
		// 	setDealershipElements(localDealerships);
		// })

	}, [dealerships, inventory]);

    return (
		<IonGrid className="content-in-center vertical-centering">
			<IonRow >
				<IonCol size='12'>
					<p>Franchised car dealerships are the front line for car manufacturers to get their products on the road.</p>
				</IonCol>
				<IonCol size='12'>
					<IonList className='dealership-list'>
						{dealershipElements?.map((dealership,index)=>{
							return (
								<DealershipElement key={index} dealership={dealership}/>
							)
						})}
					</IonList>
				</IonCol>
			</IonRow>
        </IonGrid>
    )
}

export default DealershipSelector;