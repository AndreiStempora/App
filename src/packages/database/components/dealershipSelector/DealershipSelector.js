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

	const determineAction = async()=>{
		await DB.dbInstance();
		let localDealerships = await dbRequest.requestFunction(()=>dealershipsService.getAllDealerships());
		if(dealerships){
			const simplifiedDealerships = await simplifiedArray(dealerships);	
			await dbRequest.requestFunction(()=>dealershipsService.updateLocalDealerships(simplifiedDealerships));
			localDealerships = await dbRequest.requestFunction(()=>dealershipsService.getAllDealerships());
		}
		let localInventory = await dbRequest.requestFunction(()=>vehiclesService.getAllVehicles());
		if(inventory){
			await dbRequest.requestFunction(()=>vehiclesService.updateLocalVehicles(inventory));
			localInventory = await dbRequest.requestFunction(()=>vehiclesService.getAllVehicles());
			console.log(localInventory);
		}

		
		setDealershipElements(localDealerships);
	}

	useEffect(() => {
		determineAction();
		// (async()=>{
		// 	let x = await simplifiedArray(dealerships)
		// 	x.map(async (dealership)=>{
		// 		await dbRequest.requestFunction(()=>dealershipsService.insertDealership([dealership.id,dealership.dealer, dealership.logo]));
		// 	})
		// 	let y = await dbRequest.requestFunction(()=>dealershipsService.getAllDealerships());
		// 	console.log(y)
		// 	setDealershipElements(y)
		// 	// console.log(x,'::::::::::::::')
		// 	// let logoBlob = await fetch("https://app.novosteer.me/public/dealerships/logo/1.jpg?1647123485").then(res => res.blob());
			
		// 	// let str = await blobToBase64(logoBlob);
		// 	// console.log(str)
		// 	// await dbRequest.requestFunction(()=>dealershipsService.insertDealership([3, "test33", str]));
		// 	// const dealershipsInDB = await dbRequest.requestFunction(dealershipsService.getAllDealerships);
		// 	// console.log(dealershipsInDB[0].dealership_logo, "blob+++++++++");

		// 	// setSrc(dealershipsInDB[0].dealership_logo);
			
		// })()
	}, []);

    return (
		<IonGrid className="content-in-center vertical-centering">
			<IonRow >
				<IonCol size='12'>
					<p>Franchised car dealerships are the front line for car manufacturers to get their products on the road.</p>
				</IonCol>
				<IonCol size='12'>
					<IonList className='dealership-list'>
						{dealershipElements.map((dealership,index)=>{
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

//if network is online, fetch from server and save to db else fetch from db
			// // if(network.getCurrentNetworkStatus()){

			// // 	let requestDealerships = (await pageRequest.requestFunction(requestTableContentDealerships)).dealerships;
			// // 	// for each dealership request the logo
			// // 	let requestLogos = requestDealerships.map(async(dealership)=>{
			// // 		let logo = await fetch(dealership.logo);
						
			// // 			return await {...dealership, logo:await logo.blob()};
			// // 		})
			// // 	console.log(await requestLogos)
				
			// // 	// theDealerships?.forEach(async dealership => {
			// // 	// 	let logo = await fetch(dealership.logo);
			// // 	// 	console.log(await logo.blob(),"logo");
			// // 	// })
			// // } else {
			// 	// await dbRequest.requestFunction(()=>dealershipsService.insertDealership([1,'dealership ema','logo1']));
			// 	// await dbRequest.requestFunction(()=>dealershipsService.insertDealership([2,'dealership2 ema','logo@']));
			// 	let dealerships = await dbRequest.requestFunction(dealershipsService.getAllDealerships);
			// 	console.log(dealerships,"dealerships");
			// // }
			// // console.log(dealerships);
			// // console.log(dealerships,'rr')

export default DealershipSelector;