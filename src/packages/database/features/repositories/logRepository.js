import DB from "../database";

const logRepository = {

    //insert a new log
    insertLog: async ([log_date, log_body, log_event]) => {
        return new Promise(async (resolve, reject) => {
            //transaction
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `INSERT OR REPLACE INTO log (log_date, log_body, log_event) VALUES (?, ?, ?)`,
                        [log_date, log_body, log_event],
                        (tx, res) => {
                            resolve(res);
                        }
                    );
                },
                    //transaction error
                    (error) => {
                        // console.log(error, 'insert error');
                        reject(error);
                    },
                    //transaction success
                    () => {
                        // console.log('log inserted successfully');
                        resolve("Log inserted successfully");
                    }
                );
        });
    },

    //get all logs
    getAllLogs: () => {
        return new Promise(async (resolve, reject) => {
            //transaction
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM log`,
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
                        // console.log(error, 'get all logs error');
                        reject(error);
                    },
                    // transaction success
                    () => {
                        // console.log('All logs retrieved successfully');
                        resolve("All logs retrieved successfully");
                    }
                );
        });
    },

    //get a log by id
    getLogById: ([log_id]) => {
        return new Promise(async (resolve, reject) => {
            //transaction
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM log WHERE log_id = ?`,
                        [log_id],
                        (tx, results) => {
                            resolve(results.rows.item(0));
                        }
                    );
                },
                    //transaction error
                    (error) => {
                        // console.log(error, 'get log by id error');
                        reject(error);
                    },
                    // transaction success
                    () => {
                        // console.log('Log retrieved successfully');
                        resolve("Log retrieved successfully");
                    }
                );
        });
    },

    //delete a log
    deleteLog: ([log_id]) => {
        return new Promise(async (resolve, reject) => {
            //transaction
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `DELETE FROM log WHERE log_id = ?`,
                        [log_id],
                        (tx, res) => {
                            resolve(res);
                        }
                    );
                },
                    //transaction error
                    (error) => {
                        // console.log(error, 'delete log by id error');
                        reject(error);
                    },
                    // transaction success
                    () => {
                        // console.log('Log deleted successfully');
                        resolve("Log deleted successfully");
                    }
                );
        });
    },

    //get last 50 logs  
    getLast50Logs: () => {
        return new Promise(async (resolve, reject) => {
            //transaction
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM log ORDER BY log_id DESC LIMIT 50`,
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
                        // console.log(error, 'get last 50 logs error');
                        reject(error);
                    },
                    // transaction success
                    () => {
                        // console.log('Last 50 logs retrieved successfully');
                        resolve("Last 50 logs retrieved successfully");
                    }
                );
        });
    },
    //get last 300 logs
    getLast300Logs: () => {
        return new Promise(async (resolve, reject) => {
            //transaction
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM log ORDER BY log_id DESC LIMIT 300`,
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
                        // console.log(error, 'get last 300 logs error');
                        reject(error);
                    },
                    // transaction success
                    () => {
                        // console.log('Last 300 logs retrieved successfully');
                        resolve("Last 300 logs retrieved successfully");
                    }
                );
        });
    },
    //delete all logs except last 300
    deleteAllLogsExceptLast300: () => {
        return new Promise(async (resolve, reject) => {
            //transaction
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `DELETE FROM log WHERE log_id NOT IN (SELECT log_id FROM log ORDER BY log_id DESC LIMIT 300)`,
                        [],
                        (tx, res) => {
                            resolve(res);
                        }
                    );
                },
                    //transaction error
                    (error) => {
                        // console.log(error, 'delete all logs except last 300 error');
                        reject(error);
                    },
                    // transaction success
                    () => {
                        // console.log('All logs except last 300 deleted successfully');
                        resolve("All logs except last 300 deleted successfully");
                    }
                );
        });
    }

}

export { logRepository };