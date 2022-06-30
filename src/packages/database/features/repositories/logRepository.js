import DB from "../database";

const logRepository = {

    //insert a new log
    insertLog: ([log_date, dealership_id, log_event]) => {
        DB.db.transaction((tx) => {
            tx.executeSql(`INSERT INTO log (log_date, dealership_id, log_event) VALUES (?, ?, ?)`, [log_date, dealership_id, log_event]);
        }, (error) => {
            console.log(error);
        }, () => {
            console.log("Log inserted successfully");
        });
    },

    //get all logs
    getAllLogs: () => {
        DB.db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM log`, [], (tx, results) => {
                for (let i = 0; i < results.rows.length; i++) {
                    console.log(results.rows.item(i));
                }
            }, (error) => {
                console.log(error);
            });
        });
    },

    //get a log by id
    getLogById: ([log_id]) => {
        DB.db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM log WHERE log_id = ?`, [log_id], (tx, results) => {
                console.log(results.rows.item(0));
            }, (error) => {
                console.log(error);
            }
            );
        });
    },

    //delete a log
    deleteLog: ([log_id]) => {
        DB.db.transaction((tx) => {
            tx.executeSql(`DELETE FROM log WHERE log_id = ?`, [log_id]);
        }
        );
    },

    //get last 50 logs  
    getLast50Logs: () => {
        DB.db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM log ORDER BY log_id DESC LIMIT 50`, [], (tx, results) => {
                for (let i = 0; i < results.rows.length; i++) {
                    console.log(results.rows.item(i));
                }
            }, (error) => {
                console.log(error);
            });
        });
    }
}

export { logRepository };