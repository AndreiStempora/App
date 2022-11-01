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
    
    const takePicture = async () => {
        const pictureTakenPath = 'file://' + (await CameraPreview.capture({ quality: 100 })).value;
        const copiedPictureUri = (await FS.copyFile(pictureTakenPath, filesUrl + '/' + Date.now() + '.jpg')).uri;
        await dbRequest.requestFunction(async() => await imagesService.insertImage([1, 1, null, 'vehicle_id', copiedPictureUri]));
        const dirContent = await FS.readDirectory('images');
        console.log(dirContent);

        let x = await dbRequest.requestFunction(() => imagesService.getAllImages());
        console.log(x);
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