import DB from "../database";

const dealershipsRepository = {

    //insert a new dealership
    insertDealership:([dealership_id, dealership_name, dealership_logo]) =>{
        DB.db.transaction((tx)=>{
            tx.executeSql(`INSERT INTO dealerships (dealership_id, dealership_name, dealership_logo) VALUES (?, ?, ?)`, [dealership_id, dealership_name, dealership_logo]);
        }, (error)=>{
            console.log(error);
        }, ()=>{
            console.log("Dealership inserted successfully");
        });
    },

    //get all dealerships
    getAllDealerships:() =>{
        DB.db.transaction((tx)=>{
            tx.executeSql(`SELECT * FROM dealerships`, [], (tx, results)=>{
                console.log(results.rows.item(0));
            }, (error)=>{
                console.log(error);
            }
            );
        });
    },

    //get a dealership by id
    getDealershipById:([dealership_id]) =>{
        DB.db.transaction((tx)=>{
            tx.executeSql(`SELECT * FROM dealerships WHERE dealership_id = ?`, [dealership_id], (tx, results)=>{
                console.log(results.rows.item(0));
            }, (error)=>{
                console.log(error);
            }
            );
        });
    },

    //delete a dealership
    deleteDealership:([dealership_id]) =>{
        DB.db.transaction((tx)=>{
            tx.executeSql(`DELETE FROM dealerships WHERE dealership_id = ?`, [dealership_id]);
        }
        );
    },

    //update a dealership
    updateDealership:([dealership_id, dealership_name, dealership_logo]) =>{
        DB.db.transaction((tx)=>{
            tx.executeSql(`UPDATE dealerships SET dealership_name = ?, dealership_logo = ? WHERE dealership_id = ?`, [dealership_name, dealership_logo, dealership_id]);
        }
        );
    }
}

export { dealershipsRepository };