import DB from "../database";
import { logService } from "../services/logService";

const hotspotsRepository = {
    //insert a new hotspot
    insertHotspot: async ([dealership_id, hotspot_name, hotspot_type]) => {
        return new Promise(async (resolve, reject) => {
            //transaction
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `INSERT OR REPLACE INTO hotspots (dealership_id, hotspot_name, hotspot_type) VALUES (?, ?, ?)`,
                        [dealership_id, hotspot_name, hotspot_type],
                        (tx, res) => {
                            resolve(res);
                        }
                    );
                },
                    //transaction error
                    (error) => {
                        console.log(error, 'transaction error')
                        logService.insertLog([new Date().getTime(), [dealership_id, hotspot_name, hotspot_type], error]);
                        reject(error);
                    },
                    //transaction success
                    () => {
                        logService.insertLog([new Date().getTime(), [dealership_id, hotspot_name, hotspot_type], "Hotspot inserted successfully"]);
                    }
                );
        });
    },

    //get all hotspots
    getAllHotspots: async () => {
        return new Promise(async (resolve, reject) => {
            //transaction
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM hotspots`,
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
                        logService.insertLog([new Date().getTime(), "", "Hotspots retrieved successfully"]);
                    }
                );
        });
    },
    //delete a hotspot by id
    deleteHotspotById: async ([hotspot_id]) => {
        return new Promise(async (resolve, reject) => {
            //transaction
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `DELETE FROM hotspots WHERE hotspot_id = ?`,
                        [hotspot_id],
                        (tx, res) => {
                            resolve(res);
                        }
                    );
                },
                    //transaction error
                    (error) => {
                        console.log(error);
                        logService.insertLog([new Date().getTime(), [hotspot_id], error]);
                        reject(error);
                    },
                    //transaction success
                    () => {
                        logService.insertLog([new Date().getTime(), [hotspot_id], "Hotspot deleted successfully"]);
                    }
                );
        });
    },
    //get all hotspots with dealership id
    getAllHotspotsByDealershipId: async ([dealership_id]) => {
        return new Promise(async (resolve, reject) => {
            //transaction
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM hotspots WHERE dealership_id = ?`,
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
                        logService.insertLog([new Date().getTime(), [dealership_id], "Hotspots retrieved successfully"]);
                    }
                );
        });
    },
    // get all hotspots by dealership id and hotspot type
    getAllHotspotsByDealershipIdAndHotspotType: async ([dealership_id, hotspot_type]) => {
        return new Promise(async (resolve, reject) => {
            //transaction
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM hotspots WHERE dealership_id = ? AND hotspot_type = ?`,
                        [dealership_id, hotspot_type],
                        (tx, results) => {
                            let arr = [];
                            for (let i = 0; i < results.rows.length; i++) {
                                console.log(results.rows.item(i), "......................")
                                arr.push(results.rows.item(i));
                            }

                            resolve(arr);
                        }
                    );
                },
                    //transaction error
                    (error) => {
                        console.log(error);
                        logService.insertLog([new Date().getTime(), [dealership_id, hotspot_type], error]);
                        reject(error);
                    },
                    //transaction success
                    () => {
                        logService.insertLog([new Date().getTime(), [dealership_id, hotspot_type], "Hotspots retrieved successfully"]);
                    }
                );
        });
    }
}

export { hotspotsRepository };