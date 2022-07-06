import DB from "../database";
import { logService } from "../services/logService";

const dealershipsRepository = {
    //insert a new dealership
    insertDealership:async ([dealership_id, dealership_name, dealership_logo]) =>{
        return new Promise(async (resolve, reject)=>{
            //transaction
            (await DB.dbInstance())
                .transaction((tx)=>{
                    tx.executeSql(    
                        `INSERT OR REPLACE INTO dealerships (dealership_id, dealership_name, dealership_logo) VALUES (?, ?, ?)`,
                        [dealership_id, dealership_name, dealership_logo], 
                        (tx, res)=>{
                            logService.insertLog([new Date(), dealership_id, "Dealership inserted successfully"]);
                            resolve(res);
                        },
                        (tx, error)=>{
                            console.log(error, 'got this error');
                            logService.insertLog([new Date(), dealership_id, error]);
                        }
                    );
                },
                //transaction error
                (error)=>{
                    console.log(error,'transaction error')
                    logService.insertLog([new Date(), [dealership_id, dealership_name, dealership_logo], error]);
                    reject(error);
                },
                //transaction success
                ()=>{
                    logService.insertLog([new Date(), [dealership_id, dealership_name, dealership_logo], "Dealership inserted successfully"]);
                });
            }
        );
    },

    //get all dealerships
    getAllDealerships:async () =>{
        return new Promise(async (resolve, reject)=>{
            //transaction
            (await DB.dbInstance())
                .transaction((tx)=>{
                    tx.executeSql(
                        `SELECT * FROM dealerships`, 
                        [], 
                        (tx, results)=>{

                            let arr=[];
                            for(let i = 0; i < results.rows.length; i++){
                                arr.push(results.rows.item(i));
                            }
                            resolve(arr);
                        }
                    );
                }, 
                //transaction error
                (error)=>{
                    console.log(error);
                    logService.insertLog([new Date(), "", error]);
                    reject(error);
                },
                // transaction success
                ()=>{
                    logService.insertLog([new Date(), "", "Dealerships retrieved successfully"]);
                }
            );
        });
    },

    //get a dealership by id
    getDealershipById:async ([dealership_id]) =>{
        return new Promise(async (resolve, reject)=>{
            //transaction
            (await DB.dbInstance())
                .transaction((tx)=>{
                    tx.executeSql(
                        `SELECT * FROM dealerships WHERE dealership_id = ?`,
                        [dealership_id],
                        (tx, results)=>{
                            resolve(results.rows.item(0));
                        }
                    );
                },
                //transaction error
                (error)=>{
                    console.log(error);
                    logService.insertLog([new Date(), dealership_id, error]);
                    reject(error);
                },
                // transaction success
                ()=>{
                    logService.insertLog([new Date(), dealership_id, "Dealership retrieved successfully"]);
                }
            );
        });
    },

    //delete a dealership
    deleteDealership:async ([dealership_id]) =>{
        return new Promise(async (resolve, reject)=>{
            //transaction
            (await DB.dbInstance())
                .transaction((tx)=>{
                    tx.executeSql(
                        `DELETE FROM dealerships WHERE dealership_id = ?`,
                        [dealership_id],
                        (tx, res)=>{
                            resolve(res);
                        }
                    );
                },
                //transaction error
                (error)=>{
                    console.log(error);
                    logService.insertLog([new Date(), dealership_id, error]);
                    reject(error);
                },
                // transaction success
                ()=>{
                    logService.insertLog([new Date(), dealership_id, "Dealership deleted successfully"]);
                }
            );
        });
    },

    //update a dealership
    updateDealership:async ([dealership_id, dealership_name, dealership_logo]) =>{
        return new Promise(async (resolve, reject)=>{
            //transaction
            (await DB.dbInstance())
                .transaction((tx)=>{
                    tx.executeSql(
                        `UPDATE dealerships SET dealership_name = ?, dealership_logo = ? WHERE dealership_id = ?`,
                        [dealership_name, dealership_logo, dealership_id],
                        (tx, res)=>{
                            resolve(res);
                        }
                    );
                },
                //transaction error
                (error)=>{
                    console.log(error);
                    logService.insertLog([new Date(), dealership_id, error]);
                    reject(error);
                },
                // transaction success
                ()=>{
                    console.log("Dealership updated successfully");
                    logService.insertLog([new Date(), dealership_id, "Dealership updated successfully"]);
                }
            );
        });
    },
}

export { dealershipsRepository };