import './dealershipSelector.scss'
import { IonGrid, IonRow, IonCol, IonList,IonItem } from '@ionic/react';
import DealershipElement from './DealershipElement';
import { useState, useEffect } from 'react';
import { DB, useDbRequest, dealershipsService, vehiclesService, settingsService, hotspotsService, tests } from "../../";


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
		return newDealerships;
	}

	const dealershipsToDelete = async ()=>{
		const oldList = await dbRequest.requestFunction(async ()=>dealershipsService.getAllDealerships())
		const newList = dealerships;
		const dealershipsToDelete = oldList?.filter(elem => !newList?.some(elem2 => parseInt(elem2.id) === elem.dealership_id));
		console.log(dealershipsToDelete,'for deleting');
		return dealershipsToDelete;
	}

	const serverHasNewDealerships = () =>{
		if(dealerships === undefined){
			return false;
		} else {
			return true;
		}
	}

	const setConfigs = async (dealership) =>{
		const interior = dealership?.config?.interior;
		const exterior = dealership?.config?.exterior;
		const hotspots = dealership?.config?.hotspots;
		await dbRequest.requestFunction(async ()=>settingsService.insertSetting(['interior', interior, dealership.id]));
		await dbRequest.requestFunction(async ()=>settingsService.insertSetting(['exterior', exterior, dealership.id]));
		hotspots?.map(async (hotspot)=>{
			await dbRequest.requestFunction(async ()=>hotspotsService.insertHotspot([dealership.id, hotspot]));
		})
	}

	useEffect(() => {

		(async ()=>{
			if(serverHasNewDealerships()){
				//list of new dealerships
				const newDealerships = await dealershipsToAdd();
				//go through each new dealership and add it to the database
				newDealerships?.map(async (dealership)=>{
					console.log(dealership,'for adding');
					const logoBlob = await (await fetch(dealership.logo)).blob();
					const base64string = await DB.blobToBase64(logoBlob);
					await setConfigs(dealership)
					await dbRequest.requestFunction(async ()=>dealershipsService.insertDealership([parseInt(dealership.id), dealership.dealer, base64string]));
				})
				console.log(await dbRequest.requestFunction(async ()=>dealershipsService.getAllDealerships()),'new list');
				// await dbRequest.requestFunction(async ()=>dealershipsService.insertDealership([33, "dealership.dealer", "base64string"]))
				//list of dealerships to delete
				const oldDealerships = await dealershipsToDelete();
				console.log(oldDealerships,'for deleting');
				//go through each dealership to delete and delete it from the database
				oldDealerships?.map(async (dealership)=>{
						console.log(dealership,'for deleting');
					// await dbRequest.requestFunction(async ()=>dealershipsService.deleteDealership([dealership.dealership_id]));
				})
			}
		})();
		// const newDealers = await dealershipsToAdd();
		// const simpleDealerArray = await simplifiedArray(newDealers);
		// simpleDealerArray?.forEach(async (dealership)=>{
		// 	await dbRequest.requestFunction(async ()=>dealershipsService.addDealership(dealership));					
		// })
		// newDealers?.forEach(async (dealership)=>{
		// 	const int = dealership.config.interior;
		// 	const ext = dealership.config.exterior;
		// 	const hotSpots = dealership.config.hotspots;					
			
		// })
		// await dealershipsToDelete();
		
			// dbRequest.requestFunction( async ()=>{
			// 	//drop all tables
			// 	await DB.dropAllTables();

			// 	let a  = await dealershipsService.getAllDealerships()
			// 	console.log(a,'dealerships');
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