import DB from "../database";
import { logService } from "../services/logService";

const imagesRepository = {
    
    //insert a new image
    insertImage:([image_status, image_type, hotspot_id, vehicle_id, image_data]) =>{
        DB.db.transaction((tx)=>{
            tx.executeSql(`INSERT INTO images (image_status, image_type, hotspot_id, vehicle_id, image_data) VALUES (?,?,?,?,?)`, [image_status, image_type, hotspot_id, vehicle_id, image_data]);
        }, (error)=>{
            console.log(error);
            logService.insertLog([new Date(), hotspot_id, error]);
        }, ()=>{
            console.log("Image inserted successfully");
            logService.insertLog([new Date(), hotspot_id, "Image inserted successfully"]);
        });
    },
    
    //get all images
    getAllImages:() =>{
        DB.db.transaction((tx)=>{
            tx.executeSql(`SELECT * FROM images`, []);
        }, (error)=>{
            console.log(error);
            logService.insertLog([new Date(), "", error]);
        }, ()=>{
            console.log("Images retrieved successfully");
            logService.insertLog([new Date(), "", "Images retrieved successfully"]);
        });
    },

    //get a image by id
    getImageById:([image_id]) =>{
        DB.db.transaction((tx)=>{
            tx.executeSql(`SELECT * FROM images WHERE image_id = ?`, [image_id]);
        }, (error)=>{
            console.log(error);
            logService.insertLog([new Date(), image_id, error]);
        }, ()=>{
            console.log("Image retrieved successfully");
            logService.insertLog([new Date(), image_id, "Image retrieved successfully"]);
        });
    },

    //delete an image
    deleteImage:([image_id]) =>{
        DB.db.transaction((tx)=>{
            tx.executeSql(`DELETE FROM images WHERE image_id = ?`, [image_id]);
        }, (error)=>{
            console.log(error);
            logService.insertLog([new Date(), image_id, error]);
        }, ()=>{
            console.log("Image deleted successfully");
            logService.insertLog([new Date(), image_id, "Image deleted successfully"]);
        });
    },

    //

}

export { imagesRepository };