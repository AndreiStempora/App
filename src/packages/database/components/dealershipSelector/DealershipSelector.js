import './dealershipSelector.scss'
import { IonGrid, IonRow, IonCol, IonList,IonItem } from '@ionic/react';
import DealershipElement from './DealershipElement';
import { useState, useEffect } from 'react';
import { DB, useDbRequest, dealershipsService, vehiclesService, settingsService, hotspotsService, tests } from "../../";


const DealershipSelector = ({info}) => {
	const dbRequest = useDbRequest();
	const [dealershipElements , setDealershipElements] = useState([]);

	const dealershipsToAdd = async ()=>{
		const oldList = await dbRequest.requestFunction(async ()=>dealershipsService.getAllDealerships())
		const newList = info.dealerships;
		const newDealerships = newList?.filter(elem => !oldList?.some(elem2 => parseInt(elem.id) === elem2.dealership_id));
		return newDealerships;
	}

	const vehiclesToAdd = async ([dealershipId])=>{
		const oldList = await dbRequest.requestFunction(async ()=>vehiclesService.getAllVehiclesByDealershipId([dealershipId]))
		let newList;

		for(let i = 0; i < info.dealerships.length; i++){
			if(info.vehicles[i][dealershipId] !== undefined){
				newList = info.vehicles[i][dealershipId];
			}
		}

		const newVehicles = newList?.filter(elem => !oldList?.some(elem2 => elem.vin === elem2.vehicle_vin));

		return newVehicles;
	}

	const vehiclesToDelete = async ([dealershipId])=>{
		const dealershipVehicles = await dbRequest.requestFunction(async ()=>vehiclesService.getAllVehiclesByDealershipId([dealershipId]));

		let vehiclesWithoutPics = [];
		for(let i = 0; i < dealershipVehicles.length; i++){
			if(dealershipVehicles[i].vehicle_exterior !== 1 && dealershipVehicles[i].vehicle_interior !== 1 && dealershipVehicles[i].vehicle_hotspots !== 1){
				vehiclesWithoutPics.push(dealershipVehicles[i]);
			}
		}

		let newList;
		for(let i = 0; i < info.dealerships.length; i++){
			if(info.vehicles[i][dealershipId] !== undefined){
				newList = info.vehicles[i][dealershipId];
			}
		}

		const vehiclesToDelete = vehiclesWithoutPics?.filter(elem => !newList?.some(elem2 => elem.vehicle_vin === elem2.vin));
		console.log(vehiclesWithoutPics, newList, vehiclesToDelete, "vehiclesToDelete");
		return vehiclesToDelete;
	}


	const dealershipsToDelete = async ()=>{
		const oldList = await dbRequest.requestFunction(async ()=>dealershipsService.getAllDealerships())
		const newList = info.dealerships;
		const dealershipsToDelete = oldList?.filter(elem => !newList?.some(elem2 => parseInt(elem2.id) === elem.dealership_id));
		return dealershipsToDelete;
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
		const databaseInitialOperations = async ()=>{
			dbRequest.setLoading(true);

			const newDealerships = await dealershipsToAdd();
			newDealerships?.map(async (dealership)=>{
				const logoBlob = await (await fetch(dealership.logo)).blob();
				const base64string = await DB.blobToBase64(logoBlob);
				await setConfigs(dealership)
				await dbRequest.requestFunction(async ()=>dealershipsService.insertDealership([parseInt(dealership.id), dealership.dealer, base64string]));
			})

			const oldDealerships = await dealershipsToDelete();
			oldDealerships?.map(async (dealership)=>{
				await dbRequest.requestFunction(async ()=>dealershipsService.deleteDealershipById([dealership.dealership_id]));
			})

			const currentDealerships = await dbRequest.requestFunction(async ()=>dealershipsService.getAllDealerships());
			currentDealerships?.map(async (dealership)=>{
				const newVehicles = await vehiclesToAdd([dealership.dealership_id]);
				newVehicles?.map(async (vehicle)=>{
					await dbRequest.requestFunction(async ()=>vehiclesService.insertVehicle([
						dealership.dealership_id,
						vehicle.vin,
						vehicle.stock,
						vehicle.year,
						vehicle.make,
						vehicle.model,
						vehicle.trim,
					]));
				})
				const listToDelete = await vehiclesToDelete([dealership.dealership_id]);
				listToDelete?.map(async (vehicle)=>{
					await dbRequest.requestFunction(async ()=>vehiclesService.deleteVehicleById([vehicle.vehicle_id]));
				})
			})
			const allDealerships = await dbRequest.requestFunction(async ()=>dealershipsService.getAllDealerships());
			setDealershipElements(allDealerships);
			dbRequest.setLoading(false);
		}

		if(info !== null){		
			databaseInitialOperations();
		} 
	}, [info]);

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