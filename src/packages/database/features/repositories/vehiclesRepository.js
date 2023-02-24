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
                        logService.insertLog([new Date().getTime(), [dealership_id, vehicle_vin, vehicle_stock, vehicle_date, vehicle_make, vehicle_model, vehicle_trim], "Vehicle inserted successfully"]);
                    }
                );
        });
    },

    //insert all vehicles
    insertAllVehicles: async ([vehicles, dealership_id]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .sqlBatch(
                    vehicles.map((vehicle) => [
                        `INSERT OR REPLACE INTO vehicles (dealership_id, vehicle_vin, vehicle_stock, vehicle_date, vehicle_make, vehicle_model, vehicle_trim) VALUES (?,?,?,?,?,?,?)`,
                        [dealership_id, vehicle.vin, vehicle.stock, vehicle.date, vehicle.make, vehicle.model, vehicle.trim]]),

                    (tx, res) => {
                        resolve(res);
                    },
                    //transaction error
                    (error) => {
                        console.log(error, 'transaction error');
                        logService.insertLog([new Date().getTime(), vehicles, error]);
                        reject(error);
                    },
                    //transaction success
                    () => {
                        logService.insertLog([new Date().getTime(), vehicles, "Vehicles inserted successfully"]);
                    }
                );
        });
    },

    addVehicle: async ([dealership_id, vehicle_vin, vehicle_hotspots, vehicle_interior]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())

                .transaction((tx) => {
                    tx.executeSql(
                        `INSERT OR REPLACE INTO vehicles (dealership_id, vehicle_vin, vehicle_hotspots, vehicle_interior) VALUES (?,?,?,?)`,
                        [dealership_id, vehicle_vin, vehicle_hotspots, vehicle_interior],
                        (tx, res) => {
                            resolve(res);
                        });
                },
                    //transaction error
                    (error) => {
                        console.log(error, 'transaction error');
                        logService.insertLog([new Date().getTime(), [dealership_id, vehicle_vin, vehicle_hotspots, vehicle_interior], error]);
                        reject(error);
                    },
                    //transaction success
                    () => {
                        logService.insertLog([new Date().getTime(), [dealership_id, vehicle_vin, vehicle_hotspots, vehicle_interior], "Vehicle inserted successfully"]);
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

    //get all vehicles that contain a certain string in their vin where dealership_id 
    getAllVehiclesByVin: async ([dealership_id, vehicle_vin]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM vehicles WHERE dealership_id = ? AND vehicle_vin LIKE ?`,
                        [dealership_id, `${vehicle_vin}%`],
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
                        logService.insertLog([new Date().getTime(), [dealership_id, vehicle_vin], error]);
                        reject(error);
                    },
                    //transaction success
                    () => {
                        logService.insertLog([new Date().getTime(), [dealership_id, vehicle_vin], "Vehicles retrieved successfully"]);
                    }
                );
        });
    },
    //get all vehicles by dealership id
    getAllVehiclesByDealershipId: async ([dealership_id]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM vehicles WHERE dealership_id = ?`,
                        [dealership_id],
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
                        logService.insertLog([new Date().getTime(), [dealership_id], error]);
                        reject(error);
                    },
                    //transaction success
                    () => {
                        logService.insertLog([new Date().getTime(), [dealership_id], "Vehicles retrieved successfully"]);
                    }
                );
        });
    },

    deleteAllVehiclesByDealershipId: async ([dealership_id]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `DELETE FROM vehicles WHERE dealership_id = ?`,
                        [dealership_id],
                        (tx, res) => {
                            resolve(res);
                        }
                    );
                },
                    //transaction error
                    (error) => {
                        console.log(error);
                        logService.insertLog([new Date().getTime(), [dealership_id], error]);
                        reject(error);
                    },
                    //transaction success
                    () => {
                        logService.insertLog([new Date().getTime(), [dealership_id], "Vehicles deleted successfully"]);
                    }
                );
        });
    },
    //get vehicle by vin    
    getVehicleByVin: async ([vehicle_vin]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM vehicles WHERE vehicle_vin = ?`,
                        [vehicle_vin],
                        (tx, results) => {
                            resolve(results.rows.item(0));
                        }
                    );
                },
                    //transaction error
                    (error) => {
                        console.log(error);
                        logService.insertLog([new Date().getTime(), [vehicle_vin], error]);
                        reject(error);
                    },
                    //transaction success
                    () => {
                        logService.insertLog([new Date().getTime(), [vehicle_vin], "Vehicle retrieved successfully"]);
                    }
                );
        });
    },
    //get vehicle by stock number
    getVehicleByStock: async ([vehicle_stock]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM vehicles WHERE vehicle_stock = ?`,
                        [vehicle_stock],
                        (tx, results) => {
                            resolve(results.rows.item(0));
                        }
                    );
                },
                    //transaction error
                    (error) => {
                        console.log(error);
                        logService.insertLog([new Date().getTime(), [vehicle_stock], error]);
                        reject(error);
                    },
                    //transaction success
                    () => {
                        logService.insertLog([new Date().getTime(), [vehicle_stock], "Vehicle retrieved successfully"]);
                    }
                );
        });
    },
    //update vehicle hotspots and interior by id
    updateVehicleById: async ([vehicle_id, vehicle_hotspots, vehicle_interior]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `UPDATE vehicles SET vehicle_hotspots = ?, vehicle_interior = ? WHERE vehicle_id = ?`,
                        [vehicle_hotspots, vehicle_interior, vehicle_id],
                        (tx, res) => {
                            resolve(res);
                        }
                    );
                },
                    //transaction error
                    (error) => {
                        console.log(error);
                        logService.insertLog([new Date().getTime(), [vehicle_id, vehicle_hotspots, vehicle_interior], error]);
                        reject(error);
                    },
                    //transaction success
                    () => {
                        logService.insertLog([new Date().getTime(), [vehicle_id, vehicle_hotspots, vehicle_interior], "Vehicle updated successfully"]);
                    }
                );
        });
    },

    //get all vehicles that have vehicle_hotspots or vehicle_interior 1 from a dealership id
    getVehiclesWithPics: async ([dealership_id]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM vehicles WHERE dealership_id = ? AND (vehicle_hotspots = 1 OR vehicle_interior = 1)`,
                        [dealership_id],
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
                        logService.insertLog([new Date().getTime(), [dealership_id], error]);
                        reject(error);
                    },
                    //transaction success
                    () => {
                        logService.insertLog([new Date().getTime(), [dealership_id], "Vehicles retrieved successfully"]);
                    }
                );
        });
    },

    //add or edit vehicle_make and vehicle_model to vehicle by vehicle_id
    updateVehicleMakeAndModelById: async ([vehicle_id, vehicle_make, vehicle_model]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `UPDATE vehicles SET vehicle_make = ?, vehicle_model = ? WHERE vehicle_id = ?`,
                        [vehicle_make, vehicle_model, vehicle_id],
                        (tx, res) => {
                            resolve(res);
                        }
                    );
                },
                    //transaction error
                    (error) => {
                        console.log(error);
                        logService.insertLog([new Date().getTime(), [vehicle_id, vehicle_make, vehicle_model], error]);
                        reject(error);
                    },
                    //transaction success
                    () => {
                        logService.insertLog([new Date().getTime(), [vehicle_id, vehicle_make, vehicle_model], "Vehicle updated successfully"]);
                    }
                );
        });
    },
    // get vehicles by dealership id and string that mathces vehicle_vin or vehicle_stock with an offset of 10
    getVehiclesByDealershipIdAndString: async ([dealership_id, string, offset]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM vehicles WHERE dealership_id = ? AND (vehicle_vin LIKE ? OR vehicle_stock LIKE ?) LIMIT 10 OFFSET ?`,
                        [dealership_id, string + '%', string + '%', offset],
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
                        logService.insertLog([new Date().getTime(), [dealership_id, string, offset], error]);
                        reject(error);
                    },
                    //transaction success
                    () => {
                        logService.insertLog([new Date().getTime(), [dealership_id, string, offset], "Vehicles retrieved successfully"]);
                    }
                );
        });
    }
}

export { vehiclesRepository };