import { CameraPreview } from '@capacitor-community/camera-preview';
import { useState, useEffect, useRef } from 'react';
import { FS } from '../../../packages/filesystem';
import { useDbRequest, imagesService } from "../../../packages/database";
import { Filesystem, Directory } from '@capacitor/filesystem';
import { useRSelection } from '../../database/features/utils/utilityHooks';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation';

const useCamera = () => {
    const [cameraPreview, setCameraPreview] = useState(false);
    const dbRequest = useDbRequest();
    const [filesUrl, setFilesUrl] = useState(null);
    const [setCurrentSelection, getCurrentSelection] = useRSelection();
    const orientationListener = useRef(0);

    const [cameraPreviewOptions, setCameraPreviewOptions] = useState({
        toBack: true,
        quality: 100,
        storeToFile: true,
        enableHighResolution: true,
        disableAudio: true,
        disableExifHeaderStripping: false,
        x: 0,
        y: 0,
    });


    useEffect(() => {
        (async () => {
            await FS.createDirectory('images');
            await FS.readDirectory('images');
            const url = await Filesystem.getUri({ path: 'images', directory: Directory.Data });
            setFilesUrl(url.uri);
        })()
    }, [])

    const startCamera = async () => {
        window.screen.orientation.unlock();
        if (orientationListener.current === 0) {
            window.screen.orientation.addEventListener('change', async () => {
                orientationListener.current = 1;
                if (window.screen.orientation.type === 'landscape-primary') {
                    document.querySelector('.vehiclePhotos')?.classList.add('landscape');
                } else {
                    document.querySelector('.vehiclePhotos')?.classList.remove('landscape');
                }
            })
        }

        await CameraPreview.start(cameraPreviewOptions);
        setCurrentSelection({ cameraOn: true });
        setCameraPreview(true);
    };

    const stopCamera = async () => {
        await CameraPreview.stop();
        await window.screen.orientation.lock('portrait-primary');
        setCameraPreview(false);
        setCurrentSelection({ cameraOn: false });
        setCurrentSelection('refresh');
        window.screen.orientation.removeEventListener('change');
    };

    const takePicture = async (hotspot_id, vehicle_id) => {
        const existingImage = await dbRequest.requestFunction(async () => await imagesService.getImageByVehicleIdAndHotspotId([vehicle_id, hotspot_id]));
        console.log(existingImage, "existingImage");
        console.log(await FS.readDirectory('images'), "readDirectory");
        if (existingImage.length !== 0) {
            existingImage.map(async (image) => {
                console.log(image.image_data, "wtfffff")
                await dbRequest.requestFunction(async () => await imagesService.deleteImageById([image.image_id]));
            })
        }
        console.log("image deleted")
        let imgPath = await CameraPreview.capture({ quality: 100 });
        const pictureTakenPath = imgPath.value;
        console.log(pictureTakenPath, "pictureTakenPath");
        let imgCopy = await FS.copyFile(pictureTakenPath, filesUrl + Date.now() + '.jpg');
        const copiedPictureUri = imgCopy.uri;
        console.log(copiedPictureUri, "copiedPictureUri");

        await dbRequest.requestFunction(async () => await imagesService.insertImage([1, 1, hotspot_id, vehicle_id, copiedPictureUri]));
        console.log(await dbRequest.requestFunction(async () => await imagesService.getAllImages()), "getAllImages");

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