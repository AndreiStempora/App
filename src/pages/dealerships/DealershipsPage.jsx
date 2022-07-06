import Page from '../../components/page/Page';
import usePageRequest from "../../services/customHooks/pageRequestHook";
import usePageSetters from '../../services/customHooks/pageRequestSettersHook';
import useDbRequest from '../../services/customHooks/databaseOperationsHook';
import { URL as myUrl } from '../../services/Requests/importantUrls';
import { IonButton, IonContent } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import "./dealershipsPage.scss"
import { DB, dealershipsService, logService, tests } from '../../packages/database';

const DealershipsPage = () => {
	const pageRequest = usePageRequest();
    const requestSetters = usePageSetters();
	const dbRequest = useDbRequest();
	const [summary] = useAtom(myUrl.dealership);

	const [data, setData] = useState();

	const requestTableContent = async ()=>{
		requestSetters.setUrl(summary);
		requestSetters.setRequestBody();
		const response = await requestSetters.fetch();
		return response;
	}



	const dbCalls = async()=>{
			// DB.dropAllTables();
			// await tests.testDealerships();
			// await tests.testLogs();
			await tests.testVehicles();
		
		// await DB.dropAllTables();
		// // await dealershipsService.insertDealership([555,"name","a logo"]);
		// let x = await dealershipsService.getAllDealerships();
		
		// // setData(x);
		// // return x;

		// console.log(x,"uga")
		// dealershipsService.updateDealership(['111', '666', '999']);
		// dealershipsService.getDealershipById(['111']);
		// // dealershipsService.deleteDealership(['111']);
		// dealershipsService.getAllDealerships();
		// logService.getAllLogs();
	}
	

	const clickHandler = async (e)=>{
		e.preventDefault();
		let x = await dbRequest.requestFunction(dbCalls);
		setData(x);
	}

	useEffect(() => {
		(async()=>{
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
				{data?.map((item, index)=>{
					return <div className='red' key={index}>{item.dealership_name}</div>
				})}
				{/* {dbRequest.data && dbRequest.data?.map((item, index)=>{
					return <div className='red' key={index}>{item.dealership_id}</div>
				})} */}
			</IonContent>
		</Page>
	)
}

export default DealershipsPage