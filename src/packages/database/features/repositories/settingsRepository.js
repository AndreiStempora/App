import DB from "../database";
import { logService } from "../services/logService";

const settingsRepository = {
    // insert a new setting
    insertSetting: async ([setting_name, setting_value, dealership_id]) => {
        return new Promise(async (resolve, reject) => {
            // transaction
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `INSERT OR REPLACE INTO settings (setting_name, setting_value, dealership_id) VALUES (?, ?, ?)`,
                        [setting_name, setting_value, dealership_id],
                        (tx, res) => {
                            resolve(res);
                        }
                        , (tx, error) => {
                            console.log(error, 'got this error');
                            logService.insertLog([new Date().getTime(), setting_name, error]);
                        }
                    );
                }
                , (error) => {
                    console.log(error, 'transaction error')
                    logService.insertLog([new Date().getTime(), [setting_name, setting_value, dealership_id], error]);
                    reject(error);
                }
                , () => {
                    logService.insertLog([new Date().getTime(), [setting_name, setting_value, dealership_id], "Setting inserted successfully"]);
                });
            }
        );
    },
    
    deleteSetting: async ([setting_name, dealership_id]) => {
        return new Promise(async (resolve, reject) => {
            // transaction
            (await DB.dbInstance())
                .transaction((tx) => {
                    tx.executeSql(
                        `DELETE FROM settings WHERE setting_name = ? AND dealership_id = ?`,
                        [setting_name, dealership_id],
                        (tx, res) => {
                            resolve(res);
                        }
                        , (tx, error) => {
                            console.log(error, 'got this error');
                            logService.insertLog([new Date().getTime(), setting_name, error]);
                        }
                    );
                }
                , (error) => {
                    console.log(error, 'transaction error')
                    logService.insertLog([new Date().getTime(), [setting_name, dealership_id], error]);
                    reject(error);
                }
                , () => {
                    logService.insertLog([new Date().getTime(), [setting_name, dealership_id], "Setting deleted successfully"]);
                });
            }
        );
    }
}

export { settingsRepository };