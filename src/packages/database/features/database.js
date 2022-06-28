import { SQLite } from '@awesome-cordova-plugins/sqlite';
import { tableStrings } from './createTableStrings';
const DB = {
    db:null,

    databaseCreateWithListener:()=>{
        document.addEventListener("deviceready", () =>{
        SQLite.create({
            name: 'data.db',
            location: 'default',
            androidDatabaseProvider: 'system'
        }).then(db2 =>{
            console.log("db created")
            DB.db = db2
        }).then(res=>{
            DB.setTables();
            console.log('tables set')
        })		
        })
    },

    createTable:(createTableString)=>{
        (DB.db).transaction(
            //command
            (tx)=>{
                tx.executeSql(createTableString);
            },  
            //error
            (e)=>{
                console.log("there was this error", e)
            },
            //success
            ()=>{
                console.log('this transaction was a success!!!!!')
            }
        )
    },

    setTables : ()=>{
        DB.createTable(tableStrings.dealerships);
        DB.createTable(tableStrings.images);
        DB.createTable(tableStrings.log);
        DB.createTable(tableStrings.settings);
        DB.createTable(tableStrings.vehicles);
        DB.createTable(tableStrings.hotspots);
        DB.createTable(tableStrings.allIndexes);
    }
}

export default DB;