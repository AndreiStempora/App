import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { useState, useEffect } from 'react';
import { FS } from '../../../packages/filesystem';
import { useDbRequest, imagesService } from "../../../packages/database";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { useRSelection } from '../../database/features/utils/utilityHooks';

const useCamera = () => {
    const [cameraPreview, setCameraPreview] = useState(false);
    const dbRequest = useDbRequest();
    const [filesUrl, setFilesUrl] = useState(null);
    const [setCurrentSelection, getCurrentSelection] = useRSelection();
    const [cameraPreviewOptions, setCameraPreviewOptions] = useState({
        toBack: true,
        quality: 100,
        storeToFile: true,
        enableHighResolution: true,
        disableAudio:true,
        x: 0,
        y: 0,
        // rotateWhenOrientationChanged: true,
        // disableExifHeaderStripping: false,
        // paddingBottom: 100,
        // width: window.screen.height,
        // height: window.screen.width,
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
        let counter = 0;
        window.screen.orientation.addEventListener('change', async () => {
            if (window.screen.orientation.type.includes('landscape-primary')) {
                if (counter === 0) {
                    await CameraPreview.stop();
                    await CameraPreview.start(cameraPreviewOptions);
                }
                counter++;
                document.querySelector('.vehiclePhotos')?.classList.add('landscape');
            } else {
                document.querySelector('.vehiclePhotos')?.classList.remove('landscape');
            }
        })
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
        window.screen.orientation.removeEventListener('change', () => { });
    };

    const takePicture = async (hotspot_id, vehicle_id) => {
        const existingImage = await dbRequest.requestFunction(async () => await imagesService.getImageByVehicleIdAndHotspotId([vehicle_id, hotspot_id]));
        if (existingImage.length !== 0) {
            console.log(existingImage[0].image_data, "wtfffff")
            await dbRequest.requestFunction(async () => await imagesService.deleteImageById([existingImage[0].image_id]));
        }
        const pictureTakenPath = 'file://' + (await CameraPreview.capture({ quality: 100, width: 2880, height: 2160 })).value;
        const copiedPictureUri = (await FS.copyFile(pictureTakenPath, filesUrl + '/' + Date.now() + '.jpg')).uri;
        await dbRequest.requestFunction(async () => await imagesService.insertImage([1, 1, hotspot_id, vehicle_id, copiedPictureUri]));

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