import { IonList, useIonAlert } from '@ionic/react';
import DealershipElement from './DealershipElement';
import './dealershipSelector.scss'
import {useLanguage} from "../../../packages/multiLanguage";

const DealershipSelector = ({ dealerships }) => {
	const [translate] = useLanguage();

	return (
		<>
			<p>{translate("Franchised car dealerships are the front line for car manufacturers to get their products on the road.")}</p>
			<IonList className='dealership-list'>
				{dealerships?.map((dealership, index) => {
					return (
						<DealershipElement key={index} dealership={dealership} />
					)
				})}
			</IonList>
		</>
	)
}

export default DealershipSelector;



// const deleteDatabase = async () => {
// 	await dbRequest.requestFunction(() => DB.dropAllTables());
// }
//
// const getAllDBContents = async () => {
// 	const a = await dbRequest.requestFunction(async () => dealershipsService.getAllDealerships());
// 	const b = await dbRequest.requestFunction(async () => vehiclesService.getAllVehicles());
// 	const c = await dbRequest.requestFunction(async () => hotspotsService.getAllHotspots());
// 	const d1 = await dbRequest.requestFunction(async () => settingsService.getAllSettingsByDealershipId([1]));
// 	const d2 = await dbRequest.requestFunction(async () => settingsService.getAllSettingsByDealershipId([2]));
// 	const e = await dbRequest.requestFunction(async () => imagesService.getAllImages());
// 	const f = await dbRequest.requestFunction(async () => logService.getAllLogs());
// 	const aaaaaaa = await dbRequest.requestFunction(async () => vehiclesService.getVehicleByVin(['Red market']));
// 	// console.log(a, b, c, d1, d2, e, f, "all");
// 	console.log(a, b, c, d1, d2, e, f, aaaaaaa, "aaaaaaa");
// }
//
// const dealershipsToAdd = async () => {
// 	const oldList = await dbRequest.requestFunction(async () => dealershipsService.getAllDealerships())
// 	const newList = info.dealerships;
// 	const newDealerships = newList?.filter(elem => !oldList?.some(elem2 => parseInt(elem.id) === elem2.dealership_id));
// 	return newDealerships;
// }
//
// const vehiclesToAdd = async ([dealershipId]) => {
// 	const oldList = await dbRequest.requestFunction(async () => vehiclesService.getAllVehiclesByDealershipId([dealershipId]))
// 	let newList;
//
// 	for (let i = 0; i < info.dealerships.length; i++) {
// 		if (info.vehicles[i][dealershipId] !== undefined) {
// 			newList = info.vehicles[i][dealershipId];
// 		}
// 	}
//
// 	const newVehicles = newList?.filter(elem => !oldList?.some(elem2 => elem.vin === elem2.vehicle_vin));
//
// 	return newVehicles;
// }
//
// const vehiclesToDelete = async ([dealershipId]) => {
// 	const dealershipVehicles = await dbRequest.requestFunction(async () => vehiclesService.getAllVehiclesByDealershipId([dealershipId]));
//
// 	let vehiclesWithoutPics = [];
// 	for (let i = 0; i < dealershipVehicles.length; i++) {
// 		if (dealershipVehicles[i].vehicle_exterior !== 1 && dealershipVehicles[i].vehicle_interior !== 1 && dealershipVehicles[i].vehicle_hotspots !== 1) {
// 			vehiclesWithoutPics.push(dealershipVehicles[i]);
// 		}
// 	}
//
// 	let newList;
// 	for (let i = 0; i < info.dealerships.length; i++) {
// 		if (info.vehicles[i][dealershipId] !== undefined) {
// 			newList = info.vehicles[i][dealershipId];
// 		}
// 	}
//
// 	const vehiclesToDelete = vehiclesWithoutPics?.filter(elem => !newList?.some(elem2 => elem.vehicle_vin === elem2.vin));
// 	return vehiclesToDelete;
// }
//
//
// const dealershipsToDelete = async () => {
// 	const oldList = await dbRequest.requestFunction(async () => dealershipsService.getAllDealerships())
// 	const newList = info.dealerships;
// 	const dealershipsToDelete = oldList?.filter(elem => !newList?.some(elem2 => parseInt(elem2.id) === elem.dealership_id));
// 	return dealershipsToDelete;
// }
//
// const setConfigs = async (dealership) => {
// 	// const interior = dealership?.config?.interior;
// 	// const exterior = dealership?.config?.exterior;
// 	const hotspots = dealership?.config?.hotspots;
// 	// await dbRequest.requestFunction(async ()=>settingsService.insertSetting(['interior', interior?.default, dealership.id]));
// 	// await dbRequest.requestFunction(async ()=>settingsService.insertSetting(['exterior', exterior?.default, dealership.id]));
// 	hotspots?.map(async (hotspot) => {
// 		//HOTSPOT INTERIOR  = 1
// 		//HOTSPOT EXTERIOR = 2
// 		let hotspotType;
// 		if (hotspot.type === "interior") {
// 			hotspotType = 1;
// 		} else {
// 			hotspotType = 2;
// 		}
// 		await dbRequest.requestFunction(async () => hotspotsService.insertHotspot([dealership.id, hotspot.name, hotspotType]));
// 	})
// }
//
// const alertDBNotInitialized = () => {
// 	return presentAlert({
// 		header: 'On your first login on this device you will need to have access to the Internet',
// 		cssClass: 'custom-alert',
// 		buttons: [
// 			{
// 				text: 'Ok',
// 				cssClass: 'alert-button-confirm',
// 			},
// 			{
// 				text: 'retry',
// 				handler: () => {
// 					window.location.reload();
// 				}
// 			}
// 		],
// 	})
// }
//
// const skipPageIfOnlyOneDealership = async () => {
// 	const dealerships = await dbRequest.requestFunction(async () => dealershipsService.getAllDealerships());
// 	if (dealerships.length === 1) {
// 		editSelection({ ...getSelection(), dealership_id: dealerships[0].dealership_id });
// 		history.push("/vehicle-search");
// 	}
// 	return;
// }
//
// useEffect(() => {
// 	const databaseInitialOperations = async () => {
// 		dbRequest.setLoading(true);
// 		const start = performance.now();
//
// 		const newDealerships = await dealershipsToAdd();
// 		await Promise.all(newDealerships.map(async (dealership) => {
// 			const logoBlob = await (await fetch(dealership.logo)).blob();
// 			const base64string = await DB.blobToBase64(logoBlob);
// 			await setConfigs(dealership);
// 			await dbRequest.requestFunction(async () => dealershipsService.insertDealership([parseInt(dealership.id), dealership.dealer, base64string]));
// 			return true;
// 		}));
//
// 		const oldDealerships = await dealershipsToDelete();
// 		await Promise.all(oldDealerships?.map(async (dealership) => {
// 			return await dbRequest.requestFunction(async () => dealershipsService.deleteDealershipById([dealership.dealership_id]));
// 		}))
//
// 		const currentDealerships = await dbRequest.requestFunction(async () => dealershipsService.getAllDealerships());
// 		await Promise.all(currentDealerships?.map(async (dealership) => {
// 			const newVehicles = await vehiclesToAdd([dealership.dealership_id]);
// 			await dbRequest.requestFunction(async () => await vehiclesService.insertAllVehicles([
// 				newVehicles, dealership.dealership_id
// 			]));
// 			const listToDelete = await vehiclesToDelete([dealership.dealership_id]);
// 			await Promise.all(listToDelete?.map(async (vehicle) => {
// 				return await dbRequest.requestFunction(async () => vehiclesService.deleteVehicleById([vehicle.vehicle_id]));
// 			}))
// 		}))
//
// 		const allDealerships = await dbRequest.requestFunction(async () => await dealershipsService.getAllDealerships());
// 		setDealershipElements(allDealerships);
// 		const end = performance.now();
// 		console.log(`Database initial operations took ${end - start} milliseconds.`);
//
//
// 		// await skipPageIfOnlyOneDealership();
// 		setTimeout(() => {
// 			dbRequest.setLoading(false);
// 		}, 500);
// 	}
//
// 	const setDefaultdealerships = async () => {
// 		const dealerships = await dbRequest.requestFunction(async () => dealershipsService.getAllDealerships());
//
// 		if (!dealerships.length) {
// 			alertDBNotInitialized();
// 		} else {
// 			setDealershipElements(dealerships);
// 		}
// 	}
//
// 	if (info !== null) {
// 		// deleteDatabase();
// 		databaseInitialOperations();
// 		// getAllDBContents()
// 	} else {
// 		setDefaultdealerships();
// 	}
//
// }, [info]);