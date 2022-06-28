import Page from '../../components/page/Page';
import usePageRequest from "../../services/customHooks/pageRequestHook";
import usePageSetters from '../../services/customHooks/pageRequestSettersHook';
import { URL as myUrl } from '../../services/Requests/importantUrls';
import { IonContent } from '@ionic/react';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import "./dealershipsPage.scss"
import { DB, tableStrings } from '../../packages/database';

const DealershipsPage = () => {
	const pageRequest = usePageRequest();
    const requestSetters = usePageSetters();
	const [summary] = useAtom(myUrl.dealership);

	const requestTableContent = async ()=>{
		requestSetters.setUrl(summary);
		requestSetters.setRequestBody();
		const response = await requestSetters.fetch();
		return response;
	}

	// const setDBTables = ()=>{
	// 	DB.createTable(tableStrings.dealerships);
	// 	DB.createTable(tableStrings.images);
	// 	DB.createTable(tableStrings.log);
	// 	DB.createTable(tableStrings.settings);
	// 	DB.createTable(tableStrings.vehicles);
	// 	DB.createTable(tableStrings.hotspots);
	// 	DB.createTable(tableStrings.allIndexes);
	// }

	const getBlob = async (x)=>{
		const response = await fetch(x.logo);
		let red = await response.blob();
		// let r = URL.createObjectURL(red)
		// console.log(r);
	}

	const arrayToInsertInDealership = (el,el2,el3)=>{
		return [el,el2,el3]
	}

	const addDealerships = (arr) =>{
		(DB.db).transaction(tx =>{
			tx.executeSql('INSERT INTO dealerships VALUES (?1,?2,?3)', arr )
		},(e)=>{
			console.log(e,e.message);
		},
		console.log("transaction succeeded")
		)
	}

	const checkDealership = () =>{
		(DB.db).transaction(tx =>{
			tx.executeSql('SELECT * FROM dealerships',
			[],
			(tx,res)=>{
				for(let i = 0; i < res.rows.length;i++){

					console.log(res.rows.item(i))
				}
			},(err)=>{
				console.log(err)
			}
			)})
	}

	useEffect(() => {
		// setDBTables();	
		(async()=>{
			const x = await pageRequest.requestFunction(requestTableContent);
			console.log(x.dealerships);
			addDealerships(x?.dealerships[0]?.id,x?.dealerships[0]?.dealer,getBlob(x.dealerships[0]));
			checkDealership()
		})()
	}, []);


	return (
		<Page>
			<IonContent>
				<div className='red'>DealershipsPage</div>
			</IonContent>
		</Page>
	)
}

export default DealershipsPage