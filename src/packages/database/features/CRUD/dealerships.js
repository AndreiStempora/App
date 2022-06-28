import DB from "../database";

// const dealershipsCRUD = {
//     create:(array)=>{
//         DB.db.transaction((tx)=>{
//             tx.executeSql('INSERT OR IGNORE INTO dealerships VALUES(?2,?3)', array);
//         },
//         (e)=>{
//             console.log(e)
//         },
//         ()=>{
//             console.log("inserted in dealerships")
//         })
//     },

//     read:(id)=>{
//         DB.db.transaction((tx)=>{

//         },(e)=>{
//             console.log(e.message)
//         },
//         ()=>{
//             console.log()
//         })
//     },

//     update:()=>{
        
//     },

//     delete:()=>{
        
//     }
// }