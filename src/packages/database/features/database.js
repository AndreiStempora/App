const DB = {
    //was the db initialized once or not
    dbinitialized: false,

    //the db instance
    db: null,

    //get a db instance
    dbInstance:async ()=>{
        if(!DB.dbinitialized){
            return DB.init();
        }else{
            return DB.db;
        }
    },

    //initialize the db
    init:async ()=>{
        return window.sqlitePlugin.openDatabase({
            name: 'dealership.db',
            location: 'default',
            androidDatabaseProvider: 'system'
        },async (db)=>{  
            await DB.createTables(db);
            await DB.createIndexes(db);
            DB.db = db;
            DB.dbinitialized = true;
            return db;
        }, (error)=>{
            console.log(error);            
        });
    },

    //create a table
    createTable:async (db, tableName, tableSQL) =>{
        db.transaction((tx)=>{
            tx.executeSql(tableSQL, [], function(tx, res){
                console.log("Table " + tableName + " created successfully");
            }, function(tx, error){
                console.log("Error creating table " + tableName + ": " + error.message);
            });
        });
    },

    //createTables
    createTables: async (db) =>{
        await DB.createTable(db,"dealerships", `CREATE TABLE IF NOT EXISTS dealerships (
            dealership_id	INTEGER,
            dealership_name	TEXT,
            dealership_logo	BLOB,
            PRIMARY KEY (dealership_id)
        )`);
        await DB.createTable(db,"images", `CREATE TABLE IF NOT EXISTS images (
            image_id	INTEGER,
            image_status	INTEGER,
            image_type	INTEGER,
            hotspot_id	INTEGER,
            vehicle_id	INTEGER REFERENCES vehicles (vehicle_id) ON DELETE CASCADE,
            image_data	BLOB,
            PRIMARY KEY(image_id AUTOINCREMENT)
        )`);
        await DB.createTable(db,"log", `CREATE TABLE IF NOT EXISTS log (
            log_id	INTEGER,
            log_date	INTEGER,
            dealership_id	INTEGER REFERENCES dealerships (dealership_id) ON DELETE CASCADE,
            log_event	INTEGER,
            PRIMARY KEY(log_id AUTOINCREMENT)
        )`);
        await DB.createTable(db,"settings", `CREATE TABLE IF NOT EXISTS settings (
            name	TEXT,
            value	TEXT,
            dealership_id	INTEGER REFERENCES dealerships (dealership_id) ON DELETE CASCADE
        )`);
        await DB.createTable(db,"vehicles", `CREATE TABLE IF NOT EXISTS vehicles (
            vehicle_id	INTEGER,
            dealership_id INTEGER REFERENCES dealerships(dealership_id) ON DELETE CASCADE,
            vehicle_vin	TEXT,
            vehicle_stock	TEXT,
            vehicle_date	INTEGER,
            vehicle_make	TEXT,
            vehicle_model	TEXT,
            vehicle_trim	TEXT,
            vehicle_exterior	INTEGER,
            vehicle_interior	INTEGER,
            vehicle_hotspots	INTEGER,
            PRIMARY KEY(vehicle_id AUTOINCREMENT)
        )`);
        await DB.createTable(db,"hotspots", `CREATE TABLE IF NOT EXISTS hotspots (
            hotspot_id	INTEGER,
            dealership_id INTEGER REFERENCES dealerships(dealership_id) ON DELETE CASCADE,
            hotspot_name TEXT,
            PRIMARY KEY(hotspot_id AUTOINCREMENT)
        )`);   
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
    dropTable:(tableName) =>{
        DB.db.transaction((tx)=>{
            tx.executeSql("DROP TABLE IF EXISTS " + tableName, [], function(tx, res){
                console.log("Table " + tableName + " dropped successfully");
            }, function(tx, error){
                console.log("Error dropping table " + tableName + ": " + error.message);
            });
        });
    },

    //drop all tables
    dropAllTables:() =>{
        DB.dropTable("dealerships");
        DB.dropTable("images");
        DB.dropTable("log");
        DB.dropTable("settings");
        DB.dropTable("vehicles");
        DB.dropTable("hotspots");
    }
}

export default DB;