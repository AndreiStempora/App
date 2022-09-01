
const DB = {
    //was the db initialized once or not
    dbinitialized: false,

    //the db instance
    db: null,

    //get a db instance
    dbInstance:async ()=>{
        if(!DB.dbinitialized){
            return await DB.init();
        }else{
            return DB.db;
        }
    },

    //initialize the db
    init:async ()=>{
        //get userDetails from local storage
        let userDetails = await JSON.parse(localStorage.getItem("userDetails"));
        return new Promise((resolve, reject)=>{
            window.sqlitePlugin.openDatabase({
                name: `${userDetails["email"]}.db`,
                location: 'default',
                androidDatabaseProvider: 'system'
            },(db)=>{
                
                resolve(db)
                // return true;
            }, (error)=>{
                console.log(error);            
            });
        })
        .then((db)=>{
            DB.createTables(db);
            return db;
        }).then((db)=>{
            DB.createIndexes(db);
            DB.db = db;
            DB.dbinitialized = true;
            return db;
        })
    },

    //create a table
    createTable:async (db, tableName, tableSQL) =>{
        return db.transaction((tx)=>{
            tx.executeSql(tableSQL, [], function(tx, res){
                console.log("Table " + tableName + " created successfully");
            }, function(tx, error){
                console.log("Error creating table " + tableName + ": " + error.message);
            });
        });
    },

    //createTables
    createTables: async (db) =>{ 
        DB.createTable(db,"dealerships", `CREATE TABLE IF NOT EXISTS dealerships (
            dealership_id	INTEGER,
            dealership_name	TEXT,
            dealership_logo	MEDIUMBLOB,
            PRIMARY KEY (dealership_id)
            UNIQUE (dealership_id)
        )`)
        .then(()=>{
            DB.createTable(db,"images", `CREATE TABLE IF NOT EXISTS images (
                image_id	INTEGER,
                image_status	INTEGER, 
                image_type	INTEGER,
                hotspot_id	INTEGER,
                vehicle_id	INTEGER REFERENCES vehicles (vehicle_id),
                image_data	TEXT,
                image_number INTEGER,
                PRIMARY KEY(image_id AUTOINCREMENT)
            )`);
        }).then(()=>{
            DB.createTable(db,"log", `CREATE TABLE IF NOT EXISTS log (
                log_id	    INTEGER,
                log_date	INTEGER,
                log_body    TEXT,
                log_event	INTEGER,
                PRIMARY KEY(log_id AUTOINCREMENT)
            )`);
        }).then(()=>{
            DB.createTable(db,"settings", `CREATE TABLE IF NOT EXISTS settings (
                setting_id	INTEGER,
                setting_name	TEXT,
                setting_value	TEXT,
                dealership_id	INTEGER REFERENCES dealerships (dealership_id),
                PRIMARY KEY(setting_id AUTOINCREMENT)
            )`);
        }).then(()=>{
            DB.createTable(db,"vehicles", `CREATE TABLE IF NOT EXISTS vehicles (
                vehicle_id	INTEGER,
                dealership_id INTEGER REFERENCES dealerships(dealership_id),
                vehicle_vin	TEXT,
                vehicle_stock	TEXT,
                vehicle_date	INTEGER,
                vehicle_make	TEXT,
                vehicle_model	TEXT,
                vehicle_trim	TEXT,
                vehicle_year    INTEGER,
                vehicle_exterior	INTEGER,
                vehicle_interior	INTEGER,
                vehicle_hotspots	INTEGER,
                PRIMARY KEY(vehicle_id AUTOINCREMENT)
            )`);
        }).then(()=>{
            DB.createTable(db,"hotspots", `CREATE TABLE IF NOT EXISTS hotspots (
                hotspot_id	INTEGER,
                dealership_id INTEGER REFERENCES dealerships(dealership_id),
                hotspot_name TEXT,
                PRIMARY KEY(hotspot_id AUTOINCREMENT)
            )`);
        });
    },

    //create indexes
    createIndexes:async (db) =>{
        await db.transaction((tx)=>{
            tx.executeSql('CREATE INDEX IF NOT EXISTS "dealership_id" ON "vehicles" ("dealership_id")', [], function(tx, res){
                console.log("Index dealership_id created successfully");
            }, function(tx, error){
                console.log("Error creating index dealership_id: " + error.message);
            });
        });

        await db.transaction((tx)=>{
            tx.executeSql('CREATE INDEX IF NOT EXISTS "vehicle_exterior" ON "vehicles" ("vehicle_exterior")', [], function(tx, res){
                console.log("Index vehicle_exterior created successfully");
            }, function(tx, error){
                console.log("Error creating index vehicle_exterior: " + error.message);
            });
        });

        await db.transaction((tx)=>{
            tx.executeSql('CREATE INDEX IF NOT EXISTS "vehicle_interior" ON "vehicles" ("vehicle_interior")', [], function(tx, res){
                console.log("Index vehicle_interior created successfully");
            }, function(tx, error){
                console.log("Error creating index vehicle_interior: " + error.message);
            });
        });
        
        await db.transaction((tx)=>{
            tx.executeSql('CREATE INDEX IF NOT EXISTS "vehicle_hotspots" ON "vehicles" ("vehicle_hotspots")', [], function(tx, res){
                console.log("Index vehicle_hotspots created successfully");
            }, function(tx, error){
                console.log("Error creating index vehicle_hotspots: " + error.message);
            });
        });
        
        await db.transaction((tx)=>{
            tx.executeSql('CREATE INDEX IF NOT EXISTS "vehicle_stock" ON "vehicles" ("vehicle_stock")', [], function(tx, res){
                console.log("Index vehicle_stock created successfully");
            }, function(tx, error){
                console.log("Error creating index vehicle_stock: " + error.message);
            });
        });

        await db.transaction((tx)=>{
            tx.executeSql('CREATE INDEX IF NOT EXISTS "vehicle_vin" ON "vehicles" ("vehicle_vin")', [], function(tx, res){
                console.log("Index vehicle_vin created successfully");
            }, function(tx, error){
                console.log("Error creating index vehicle_vin: " + error.message);
            });
        });
        
    },
    
    //drop a table
    dropTable:async(tableName) =>{
        (await DB.dbInstance()).transaction((tx)=>{
            tx.executeSql("DROP TABLE IF EXISTS " + tableName, [], function(tx, res){
                console.log("Table " + tableName + " dropped successfully");
            }, function(tx, error){
                console.log("Error dropping table " + tableName + ": " + error.message);
            });
        });
    },

    //drop all tables
    dropAllTables:async () =>{
        await DB.dropTable("dealerships");
        await DB.dropTable("images");
        await DB.dropTable("log");
        await DB.dropTable("settings");
        await DB.dropTable("vehicles");
        await DB.dropTable("hotspots");
        DB.dbinitialized = false;
        return true;
    },

    blobToBase64 : blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    }
}

export default DB;