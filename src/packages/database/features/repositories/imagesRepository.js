import DB from "../database";
import { logService } from "../services/logService";

const imagesRepository = {
    
    //insert a new image
    insertImage: async ([image_status, image_type, hotspot_id, vehicle_id, image_data]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `INSERT OR REPLACE INTO images (image_status, image_type, hotspot_id, vehicle_id, image_data) VALUES (?, ?, ?, ?, ?)`,
                        [image_status, image_type, hotspot_id, vehicle_id, image_data],
                        (tx, res) => {
                            resolve(res);
                        }
                    );
                },
                //transaction error
                (error) => {
                    // console.log(error, 'insert error');
                    logService.insertLog([new Date().getTime(), [image_status, image_type, hotspot_id, vehicle_id, image_data], error]);
                    reject(error);
                },
                //transaction success
                () => {
                    logService.insertLog([new Date().getTime(), [image_status, image_type, hotspot_id, vehicle_id, image_data], "Image inserted successfully"]);
                }
            );
        });
    },

    //get all images
    getAllImages: async () => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM images`,
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
                    // console.log(error, 'getAllImages error');
                    logService.insertLog([new Date().getTime(), "", error]);
                    reject(error);
                },
                //transaction success
                () => {
                    logService.insertLog([new Date().getTime(), "", "All images retrieved successfully"]);
                }
            );
        });
    },

    //get image by id
    getImageById: async ([image_id]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM images WHERE image_id = ?`,
                        [image_id],
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
                    // console.log(error, 'getImageById error');
                    logService.insertLog([new Date().getTime(), [image_id], error]);
                    reject(error);
                },
                //transaction success
                () => {
                    logService.insertLog([new Date().getTime(), [image_id], "Image retrieved successfully"]);
                }
            );
        });
    },

    //get all images by vehicle id
    getAllImagesByVehicleId: async ([vehicle_id]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM images WHERE vehicle_id = ?`,
                        [vehicle_id],
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
                    // console.log(error, 'getAllImagesByVehicleId error');
                    logService.insertLog([new Date().getTime(), [vehicle_id], error]);
                    reject(error);
                },
                //transaction success
                () => {
                    logService.insertLog([new Date().getTime(), [vehicle_id], "All images retrieved successfully"]);
                }
            );
        });
    },

    //get all images by hotspot id
    getAllImagesByHotspotId: async ([hotspot_id]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM images WHERE hotspot_id = ?`,
                        [hotspot_id],
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
                    // console.log(error, 'getAllImagesByHotspotId error');
                    logService.insertLog([new Date().getTime(), [hotspot_id], error]);
                    reject(error);
                },
                //transaction success
                () => {
                    logService.insertLog([new Date().getTime(), [hotspot_id], "All images retrieved successfully"]);
                }
            );
        });
    },

    //delete an image
    deleteImageById: async ([image_id]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `DELETE FROM images WHERE image_id = ?`,
                        [image_id],
                        (tx, res) => {
                            resolve(res);
                        }
                    );
                },
                //transaction error
                (error) => {
                    // console.log(error, 'deleteImage error');
                    logService.insertLog([new Date().getTime(), [image_id], error]);
                    reject(error);
                },
                //transaction success
                () => {
                    logService.insertLog([new Date().getTime(), [image_id], "Image deleted successfully"]);
                }
            );
        });
    },

    //delete all images by vehicle id
    deleteAllImagesByVehicleId: async ([vehicle_id]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `DELETE FROM images WHERE vehicle_id = ?`,
                        [vehicle_id],
                        (tx, res) => {
                            resolve(res);
                        }
                    );
                },
                //transaction error
                (error) => {
                    // console.log(error, 'deleteAllImagesByVehicleId error');
                    logService.insertLog([new Date().getTime(), [vehicle_id], error]);
                    reject(error);
                },
                //transaction success
                () => {
                    logService.insertLog([new Date().getTime(), [vehicle_id], "All images deleted successfully"]);
                }
            );
        });
    },
    //get image by vehicle id and hotspot id
    getImageByVehicleIdAndHotspotId: async ([vehicle_id, hotspot_id]) => {
        return new Promise(async (resolve, reject) => {
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM images WHERE vehicle_id = ? AND hotspot_id = ?`,
                        [vehicle_id, hotspot_id],
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
                    // console.log(error, 'getImageByVehicleIdAndHotspotId error');
                    logService.insertLog([new Date().getTime(), [vehicle_id, hotspot_id], error]);
                    reject(error);
                },
                //transaction success
                () => {
                    logService.insertLog([new Date().getTime(), [vehicle_id, hotspot_id], "Image retrieved successfully"]);
                }
            );
        });
    }
    


}

export { imagesRepository };