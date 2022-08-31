import './dealershipSelector.scss'
import { IonGrid, IonRow, IonCol, IonList,IonItem } from '@ionic/react';
import DealershipElement from './DealershipElement';
import { useState, useEffect } from 'react';
import { DB, useDbRequest, dealershipsService, vehiclesService, tests } from "../../";


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

	const dealershipsToAdd = async ()=>{
		const oldList = await dbRequest.requestFunction(async ()=>dealershipsService.getAllDealerships())
		const newList = dealerships;
		const newDealerships = newList?.filter(elem => !oldList?.some(elem2 => parseInt(elem.id) === elem2.dealership_id));
		console.log(newDealerships,'for adding');
	}

	const dealershipsToDelete = async ()=>{
		const oldList = await dbRequest.requestFunction(async ()=>dealershipsService.getAllDealerships())
		const newList = dealerships;
		const newDealerships = oldList?.filter(elem => !newList?.some(elem2 => parseInt(elem2.id) === elem.dealership_id));
		console.log(newDealerships,'for deleting');
	}

	const serverHasNewDealerships = () =>{
		if(dealerships === undefined){
			return false;
		} else {
			return true;
		}
	}

	

	useEffect(() => {

		(async ()=>{
			if(serverHasNewDealerships()){
				const newDealers = await dealershipsToAdd();
				const simpleDealerArray = await simplifiedArray(newDealers);
				simpleDealerArray?.forEach(async (dealership)=>{
					await dbRequest.requestFunction(async ()=>dealershipsService.addDealership(dealership));					
				})
				newDealers?.forEach(async (dealership)=>{
					const int = dealership.config.interior;
					const ext = dealership.config.exterior;
					const hotSpots = dealership.config.hotspots;					
					
				})
				await dealershipsToDelete();
			}
		})();
		// DB.dbInstance().then(async (db)=>{
		// 	dbRequest.requestFunction = async ()=>{
		// 		//drop all tables
		// 		await DB.dropAllTables();
		// 	}
		// })
		// 	dbRequest.requestFunction(async ()=>{dealershipsService.getAllDealerships()}).then(async (dealerships)=>{console.log(dealerships,'dealerships')})
		// })
		// 	return await dbRequest.requestFunction(async ()=> await dealershipsService.getAllDealerships())	
		// }).then(async (localDealerships)=>{
		// 	if(serverHasNewDealerships()){

		// 	}
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


		// DB.dbInstance().then( db =>{
		// 	dbRequest.requestFunction(()=>{
		// 		tests.testCascade()
		// 	})
		// })


			// 	dealershipsService.insertDealership([57,'dealership 57', 'logo'])
			// }).then(()=>{
			// 	return dealershipsService.getAllDealerships();	
			// }).then(dealers =>{
			// 	console.log(dealers,'dealers');
			// })
			// vehiclesService.insertVehicle([57, "vin_abc", 'vehicle_stock', "vehicle_date", "vehicle_make", "vehicle_model", "vehicle_trim", "vehicle_interior", "vehicle_exterior", "vehicle_hotspots"]);
			// vehiclesService.insertVehicle([57, "vin_abc", 'vehicle_stock', "vehicle_date", "vehicle_make", "vehicle_model", "vehicle_trim", "vehicle_interior", "vehicle_exterior", "vehicle_hotspots"]);
			// return vehiclesService.getAllVehicles();}).then(vehicles =>{console.log(vehicles,'vehicles');})
			// .then(()=>{
			// 	dealershipsService.deleteDealership([57]);
			// }).then(()=>{
			// 	return dealershipsService.getAllDealerships();
			// }).then(dealers =>{
			// 		console.log(dealers,'dealers');
			// 	})
			// .then(()=>{
			// 	return vehiclesService.getAllVehicles();}).then(vehicles =>{console.log(vehicles,'vehicles')
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