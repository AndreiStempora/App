import Page from '../../components/page/Page';
import usePageRequest from "../../services/customHooks/pageRequestHook";
import usePageSetters from '../../services/customHooks/pageRequestSettersHook';
import useDbRequest from '../../services/customHooks/databaseOperationsHook';
import { URL as myUrl } from '../../services/Requests/importantUrls';
import { IonButton, IonContent } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import "./dealershipsPage.scss"
import { DB, dealershipsService, logService, tests, vehiclesService } from '../../packages/database';

const DealershipsPage = () => {
	const pageRequest = usePageRequest();
    const requestSetters = usePageSetters();
	const dbRequest = useDbRequest();
	const [summary] = useAtom(myUrl.dealership);
	const [inventory] = useAtom(myUrl.inventory);

	// const [data, setData] = useState();
	let dealData;
	let vehicleData;

	const requestTableContentDealerships = async ()=>{
		requestSetters.setUrl(summary);
		requestSetters.setRequestBody();
		const response = await requestSetters.fetch();
		return response;
	}

	const requestTableContentvehicles = async ()=>{
		requestSetters.setUrl(inventory);
		requestSetters.setFormData({dealership:1})
		requestSetters.setRequestBody();
		const response = await requestSetters.fetch();
		return response;
	}



	const dbCalls = async()=>{
		// console.log(dealData,'red')
		// await dealershipsService.insertDealership([8, "Dealership 8", "https://www.gelogo_color_272x92dp.png"]);
		// await dealershipsService.insertDealership([7, "Dealership 7", "https://www.gelogo_color_272x92dp.png"]);
		// await dealershipsService.insertDealership([81, "Dealership 81", "https://www.gelogo_color_272x92dp.png"]);
		// await DB.dropAllTables();
		await dealershipsService.updateLocalDealerships(dealData);
		await vehiclesService.updateLocalVehicles(vehicleData);
		// await tests.testDealerships();

		// await tests.testLogs();

		// await tests.testVehicles();
		
		// await DB.dropAllTables();
		// // await dealershipsService.insertDealership([555,"name","a logo"]);
		// let x = await dealershipsService.getAllDealerships();
		
		// setData(x);
		// console.log(x,"xx");

		// console.log(x,"uga")
		// dealershipsService.updateDealership(['111', '666', '999']);
		// dealershipsService.getDealershipById(['111']);
		// // dealershipsService.deleteDealership(['111']);
		// dealershipsService.getAllDealerships();
		// logService.getAllLogs();
	}
	

	const clickHandler = async (e)=>{
		// e.preventDefault();
		// let x = await dbRequest.requestFunction(dbCalls);
		// setData(x);
	}

	useEffect(() => {
		(async()=>{
			
			let x = await pageRequest.requestFunction(requestTableContentDealerships);
			console.log(x,"x")
			
			dealData = x.dealerships;

			let y = await pageRequest.requestFunction(requestTableContentvehicles);
			console.log(y,"y")
			vehicleData = y.vehicles;


			await dbRequest.requestFunction(dbCalls);
			// console.log(await dbRequest.requestFunction(dbCalls))
			// setData(x);
			// console.log(data,"auuuuuuuuuga")
		})()
	}, []);

	return (
		<Page>
			<IonContent>
				<div className='red'>DealershipsPage</div>
				<IonButton onClick={clickHandler} >Click</IonButton>
				{/* <button >ClickMeh</button> */}
				{/* {data?.map((item, index)=>{
					return <div className='red' key={index}>{item.dealership_name}</div>
				})} */}
				{/* {dbRequest.data && dbRequest.data?.map((item, index)=>{
					return <div className='red' key={index}>{item.dealership_id}</div>
				})} */}
			</IonContent>
		</Page>
	)
}

export default DealershipsPage