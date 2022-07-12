import './dealershipSelector.scss'
import { IonContent } from '@ionic/react';
import DealershipElement from './DealershipElement';
import {  usePageRequest, usePageSetters } from "../../../../services";
import { useState, useEffect } from 'react';
import { DB, useDbRequest, dealershipsService } from "../../";
import { network } from '../../../network';

const DealershipSelector = ({dealerships}) => {
	const dbRequest = useDbRequest();
	const pageRequest = usePageRequest();
	const requestSetters = usePageSetters();

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

	// const usableArray = async (arr)=>{
	// 	try{	
	// 		return await Promise.all(arr?.map(async (dealership)=>{
	// 			console.log(dealership.logo);
	// 			let src = window.URL.createObjectURL(dealership.logo);
	// 			return {id: parseInt(dealership.id), dealer: dealership.dealer, logo: src}
	// 		}
	// 		))
	// 	} catch(e){
	// 		console.log(e);
	// 	}
	// }
	
	

	useEffect(() => {
		(async()=>{
			let x = await simplifiedArray(dealerships)
			x.map(async (dealership)=>{
				await dbRequest.requestFunction(()=>dealershipsService.insertDealership([dealership.id,dealership.dealer, dealership.logo]));
			})
			let y = await dbRequest.requestFunction(()=>dealershipsService.getAllDealerships());
			console.log(y)
			setDealershipElements(y)
			// console.log(x,'::::::::::::::')
			// let logoBlob = await fetch("https://app.novosteer.me/public/dealerships/logo/1.jpg?1647123485").then(res => res.blob());
			
			// let str = await blobToBase64(logoBlob);
			// console.log(str)
			// await dbRequest.requestFunction(()=>dealershipsService.insertDealership([3, "test33", str]));
			// const dealershipsInDB = await dbRequest.requestFunction(dealershipsService.getAllDealerships);
			// console.log(dealershipsInDB[0].dealership_logo, "blob+++++++++");

			// setSrc(dealershipsInDB[0].dealership_logo);
			
		})()
	}, [dealerships]);
    return (
		<IonContent>
			<div className='element-title'>DealershipsSelector</div>
			{dealershipElements.map((dealership,index)=>{
				return <DealershipElement key={index} dealership={dealership}/>
			})}
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