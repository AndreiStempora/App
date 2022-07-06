import DB from "../database";
import { logService } from "../services/logService";

const vehiclesRepository = {
    //insert a new vehicle
    insertVehicle: async ([dealership_id, vehicle_vin, vehicle_stock, vehicle_date, vehicle_make, vehicle_model, vehicle_trim, vehicle_interior, vehicle_exterior, vehicle_hotspots]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `INSERT OR REPLACE INTO vehicles (dealership_id, vehicle_vin, vehicle_stock, vehicle_date, vehicle_make, vehicle_model, vehicle_trim, vehicle_interior, vehicle_exterior, vehicle_hotspots) VALUES (?,?,?,?,?,?,?,?,?,?)`, 
                        [dealership_id, vehicle_vin, vehicle_stock, vehicle_date, vehicle_make, vehicle_model, vehicle_trim, vehicle_interior, vehicle_exterior, vehicle_hotspots],
                        (tx, res) => {
                            resolve(res);
                    });
                },
                //transaction error
                (error) => {
                    console.log(error, 'transaction error');
                    logService.insertLog([new Date(), dealership_id, vehicle_vin, error]);
                    reject(error);
                },
                //transaction success
                () => {
                    logService.insertLog([new Date(), [dealership_id, vehicle_vin, vehicle_stock, vehicle_date, vehicle_make, vehicle_model, vehicle_trim, vehicle_interior, vehicle_exterior, vehicle_hotspots] , "Vehicle inserted successfully"]);
                }
            );
        });
    },
    //get all vehicles
    getAllVehicles: async () => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM vehicles`,
                        [],
                        (tx, results) => {
                            let arr = [];
                            for (let i = 0; i < results.rows.length; i++) {
                                arr.push(results.rows.item(i));
                            }
                            resolve(arr);
                        }
                    );
                },
                //transaction error
                (error) => {
                    console.log(error);
                    logService.insertLog([new Date(), "", error]);
                    reject(error);
                }
            );
        });
    },
    //get a vehicle by id
    getVehicleById: async ([vehicle_id]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM vehicles WHERE vehicle_id = ?`,
                        [vehicle_id],
                        (tx, results) => {
                            resolve(results.rows.item(0));
                        }
                    );
                },
                //transaction error
                (error) => {
                    console.log(error);
                    logService.insertLog([new Date(), "", error]);
                    reject(error);
                }
            );
        });
    },
    //get all vehicles that contain a certain string in their vin
    getAllVehiclesByVin: async ([vin]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM vehicles WHERE vehicle_vin LIKE '%${vin}%'`,
                        [],
                        (tx, results) => {
                            let arr = [];
                            for (let i = 0; i < results.rows.length; i++) {
                                arr.push(results.rows.item(i));
                            }
                            resolve(arr);
                        }
                    );
                },
                //transaction error
                (error) => {
                    console.log(error);
                    logService.insertLog([new Date(), "", error]);
                    reject(error);
                }
            );
        });
    }

}

export { vehiclesRepository };