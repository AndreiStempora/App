import './dealershipSelector.scss'
import { IonContent } from '@ionic/react';
import DealershipElement from './DealershipElement';
import { useState, useEffect } from 'react';
import { DB, useDbRequest, dealershipsService } from "../../";
import { network } from '../../../network';



const DealershipSelector = ({dealerships}) => {
	const dbRequest = useDbRequest();
	const simplifiedArray = async (arr)=>{
		try{
	
			return await Promise.all(arr?.map(async (dealership)=>{
					let logoBlob = await (await fetch(dealership.logo)).blob();
					return {id: parseInt(dealership.id), dealer: dealership.dealer, logo: logoBlob}
				})
			)

		} catch(e){
			console.log(e);
		}
	}

	const usableArray = async (arr)=>{
		try{	
			return await Promise.all(arr?.map(async (dealership)=>{
				console.log(dealership.logo);
				let src = window.URL.createObjectURL(dealership.logo);
				return {id: parseInt(dealership.id), dealer: dealership.dealer, logo: src}
			}
			))
		} catch(e){
			console.log(e);
		}
	}


	useEffect(() => {
		
		
		(async()=>{
			const simplifiedDealershipsArray = await simplifiedArray(dealerships);
			//get all dealerships
			await dbRequest.requestFunction(()=>dealershipsService.updateLocalDealerships(simplifiedDealershipsArray));

			const dealershipsInDB = await dbRequest.requestFunction(dealershipsService.getAllDealerships);
			console.log(dealershipsInDB, "dealerships in db");
			
			let x = await usableArray(dealershipsInDB);
			console.log(x, "usable array");
		})()
	}, [dealerships]);
    return (
		<IonContent>
			<div className='element-title'>DealershipsSelector</div>
			<DealershipElement />
			<DealershipElement />
		</IonContent>
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

export default DealershipSelector