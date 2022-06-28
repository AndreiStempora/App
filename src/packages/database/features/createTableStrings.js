const tableStrings = {
    dealerships:`CREATE TABLE IF NOT EXISTS dealerships (
                    dealership_id	INTEGER,
                    dealership_name	TEXT,
                    dealership_logo	BLOB,
                    PRIMARY KEY(dealership_id AUTOINCREMENT)
                )`,

    images:     `CREATE TABLE IF NOT EXISTS images (
                    image_id	INTEGER,
                    image_status	INTEGER,
                    image_type	INTEGER,
                    hotspot_id	INTEGER,
                    vehicle_id	INTEGER REFERENCES vehicles (vehicle_id) ON DELETE CASCADE,
                    image_data	BLOB,
                    PRIMARY KEY(image_id AUTOINCREMENT)
                )`,

    log:        `CREATE TABLE IF NOT EXISTS log (
                    log_id	INTEGER,
                    log_date	INTEGER,
                    dealership_id	INTEGER REFERENCES dealerships (dealership_id) ON DELETE CASCADE,
                    log_event	INTEGER,
                    PRIMARY KEY(log_id AUTOINCREMENT)
                )`,

    settings:   `CREATE TABLE IF NOT EXISTS settings (
                    name	TEXT,
                    value	TEXT,
                    dealership_id	INTEGER REFERENCES dealerships (dealership_id) ON DELETE CASCADE
                )`,

    vehicles:   `CREATE TABLE IF NOT EXISTS vehicles (
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
                )`,
    hotspots: `CREATE TABLE IF NOT EXISTS hotspots (
                    hotspot_id	INTEGER,
                    dealership_id INTEGER REFERENCES dealerships(dealership_id) ON DELETE CASCADE,
                    hotspot_name TEXT,
                    PRIMARY KEY(hotspot_id AUTOINCREMENT)
                )`,

    allIndexes:`CREATE INDEX IF NOT EXISTS "dealership_id" ON "vehicles" ("dealership_id"); 
                CREATE INDEX IF NOT EXISTS "vehicle_exterior" ON "vehicles" ("vehicle_exterior");
                CREATE INDEX IF NOT EXISTS "vehicle_hotspots" ON "vehicles" ("vehicle_hotspots");
                CREATE INDEX IF NOT EXISTS "vehicle_interior" ON "vehicles" ("vehicle_interior");
                CREATE INDEX IF NOT EXISTS "vehicle_stock" ON "vehicles" ("vehicle_stock");
                CREATE INDEX IF NOT EXISTS "vehicle_vin" ON "vehicles" ("vehicle_vin");`,
}

export {tableStrings}

