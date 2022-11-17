import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { useState, useEffect } from 'react';
import { FS } from '../../../packages/filesystem';
import { useDbRequest, imagesService } from "../../../packages/database";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const useCamera = () => {
    const [cameraPreview, setCameraPreview] = useState(false);
    const dbRequest = useDbRequest();
    const [filesUrl, setFilesUrl] = useState(null);
    const [cameraPreviewOptions, setCameraPreviewOptions] = useState({
        toBack: true,
        quality: 100,
        storeToFile: true,
        enableHighResolution: true,
    });


    useEffect(() => {
        (async()=>{
            await FS.createDirectory('images');
            await FS.readDirectory('images');
            const url = await Filesystem.getUri({path:'images',directory:Directory.Data});
            setFilesUrl(url.uri);
        })()
    },[])

    
    
    const startCamera = async () => {
        await CameraPreview.start(cameraPreviewOptions);
        setCameraPreview(true);
    };
    
    const stopCamera = async () => {
        await CameraPreview.stop();
        setCameraPreview(false);
    };
    
    const takePicture = async (hotspot_id,vehicle_id) => {
        const existingImage = await dbRequest.requestFunction(async ()=>await imagesService.getImageByVehicleIdAndHotspotId([vehicle_id,hotspot_id]));
        console.log(existingImage, 'existingImage');
        if(existingImage.length !== 0){
            console.log(existingImage[0].image_data,"wtfffff")
            let fileDeletedConfirmation = await FS.deleteFile(existingImage[0].image_data);
            if(fileDeletedConfirmation){
                await dbRequest.requestFunction(async ()=>await imagesService.deleteImageById([existingImage[0].image_id]));
            }
        }
        const pictureTakenPath = 'file://' + (await CameraPreview.capture({ quality: 100, width:3840, height:2160 })).value;
        const copiedPictureUri = (await FS.copyFile(pictureTakenPath, filesUrl + '/' + Date.now() + '.jpg')).uri;
        await dbRequest.requestFunction(async() => await imagesService.insertImage([1, 1, hotspot_id, vehicle_id, copiedPictureUri]));

        const dirContent = await FS.readDirectory('images');
        console.log(dirContent, 'dirContent');

         // console.log(filesPath, 'filesPath');
        // console.log(result);
        // const contents = await Filesystem.readFile({ path: copiedPictureUri });
        // const base64PictureData = "data:image/jpg;base64," + contents.data;
        // console.log(base64PictureData);

        // let x = await dbRequest.requestFunction(() => imagesService.getAllImages());
        // console.log(x, 'x');
    };
    
    return {
        cameraPreview,
        cameraPreviewOptions,
        setCameraPreviewOptions,
        startCamera,
        stopCamera,
        takePicture,
    };

};

export default useCamera;