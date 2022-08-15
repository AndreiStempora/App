import DB from "../database";
import { logService } from "../services/logService";

const vehiclesRepository = {
    //insert a new vehicle
    insertVehicle: async ([dealership_id, vehicle_vin, vehicle_stock, vehicle_date, vehicle_make, vehicle_model, vehicle_trim]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `INSERT OR REPLACE INTO vehicles (dealership_id, vehicle_vin, vehicle_stock, vehicle_date, vehicle_make, vehicle_model, vehicle_trim) VALUES (?,?,?,?,?,?,?)`, 
                        [dealership_id, vehicle_vin, vehicle_stock, vehicle_date, vehicle_make, vehicle_model, vehicle_trim],
                        (tx, res) => {
                            resolve(res);
                    });
                },
                //transaction error
                (error) => {
                    console.log(error, 'transaction error');
                    logService.insertLog([new Date().getTime(), [dealership_id, vehicle_vin, vehicle_stock, vehicle_date, vehicle_make, vehicle_model, vehicle_trim], vehicle_vin, error]);
                    reject(error);
                },
                //transaction success
                () => {
                    logService.insertLog([new Date().getTime(), [dealership_id, vehicle_vin, vehicle_stock, vehicle_date, vehicle_make, vehicle_model, vehicle_trim] , "Vehicle inserted successfully"]);
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
                    logService.insertLog([new Date().getTime(), "", error]);
                    reject(error);
                },
                //transaction success
                () => {
                    logService.insertLog([new Date().getTime(), "", "Vehicles retrieved successfully"]);
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
                    logService.insertLog([new Date().getTime(), [vehicle_id], error]);
                    reject(error);
                },
                //transaction success
                () => {
                    logService.insertLog([new Date().getTime(), [vehicle_id], "Vehicle retrieved successfully"]);
                }
            );
        });
    },
    //delete a vehicle by id
    deleteVehicleById: async ([vehicle_id]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `DELETE FROM vehicles WHERE vehicle_id = ?`,
                        [vehicle_id],
                        (tx, res) => {
                            resolve(res);
                        }
                    );
                },
                //transaction error
                (error) => {
                    console.log(error);
                    logService.insertLog([new Date().getTime(), [vehicle_id], error]);
                    reject(error);
                },
                //transaction success
                () => {
                    logService.insertLog([new Date().getTime(), [vehicle_id], "Vehicle deleted successfully"]);
                }
            );
        });
    },

    //get all vehicles that don't have any empty fields
    getAllVehiclesWithoutEmptyFields: async () => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM vehicles WHERE vehicle_vin != '' AND vehicle_stock != '' AND vehicle_date != '' AND vehicle_make != '' AND vehicle_model != '' AND vehicle_trim != ''`,
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
                    logService.insertLog([new Date().getTime(), "", error]);
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
                    logService.insertLog([new Date().getTime(), [vin], error]);
                    reject(error);
                },
                //transaction success
                () => {
                    logService.insertLog([new Date().getTime(), [vin], "Vehicles retrieved successfully"]);
                }
            );
        });
    }

}

export { vehiclesRepository };