import { useAtom } from "jotai";
import { user } from "../../../../services/user/user";
import { useDbRequest, hotspotsService, vehiclesService, imagesService } from "../../index";
import { FS } from "../../../filesystem";
import { URL, usePageSetters, usePageRequest } from "../../../../services";
import { useState, useEffect } from "react";

const useRSelection = () => {
    const [currentSelection, setCurrentSelection] = useAtom(user.userCurrentSelections);
    const [, getCurrentSelection] = useAtom(user.getCurrentSelections);

    const editSelection = (selection) => {
        setCurrentSelection((currentSelection) => {
            return { ...currentSelection, ...selection }
        })
    }
    return [editSelection, getCurrentSelection];
};


const useHotspot = () => {
    const dbRequest = useDbRequest();
    const [, getCurrentSelection] = useAtom(user.getCurrentSelections);

    const getAllHotspotsForCurrentDealership = async () => {
        const dealership_id = getCurrentSelection().dealership_id;
        return await dbRequest.requestFunction(async () => {
            await hotspotsService.getAllHotspotsByDealershipId([dealership_id]);
        })
    }

    const getCurrentHotspotsByType = async () => {
        const dealership_id = getCurrentSelection().dealership_id;
        const hotspot_type = getCurrentSelection().hotspot_type;
        return await dbRequest.requestFunction(async () => {
            await hotspotsService.getAllHotspotsByDealershipIdAndHotspotType([dealership_id, hotspot_type]);
        })
    }

    const getCurrentHotspotsByGivenType = async (hotspot_type) => {
        const dealership_id = getCurrentSelection().dealership_id;
        return await dbRequest.requestFunction(async () => {
            await hotspotsService.getAllHotspotsByDealershipIdAndHotspotType([dealership_id, hotspot_type]);
        })
    }

    const getCurrentHotspotPhoto = async (hotspot_id) => {
        const vehicle_id = getCurrentSelection().vehicle_id;
        return await dbRequest.requestFunction(async () => {
            await imagesService.getImageByVehicleIdAndHotspotId([vehicle_id, hotspot_id]);
        })
    }

    const getHotspotsWithPhotos = async (hotspot_type) => {
        if (hotspot_type === undefined) {
            const vehicle_id = getCurrentSelection().vehicle_id;
            const hotspots = await getAllHotspotsForCurrentDealership();
            let x = hotspots?.map(async (hotspot) => {
                const photo = await imagesService.getImageByVehicleIdAndHotspotId([vehicle_id, hotspot.hotspot_id]);
                return [hotspot, ...photo]
            })
            return x;
        } else {
            const vehicle_id = getCurrentSelection().vehicle_id;
            const hotspots = await getCurrentHotspotsByGivenType(hotspot_type);

            let x = hotspots?.map(async (hotspot) => {
                return await dbRequest.requestFunction(async () => {
                    const photo = await imagesService.getImageByVehicleIdAndHotspotId([vehicle_id, hotspot.hotspot_id]);
                    return [hotspot, ...photo];
                });

            })
            return x;
        }
    }

    const getHotspotsByGivenType = async (hotspot_type) => {
        const dealership_id = getCurrentSelection().dealership_id;
        const hotspots = await dbRequest.requestFunction(async () => {
            return await hotspotsService.getAllHotspotsByDealershipIdAndHotspotType([dealership_id, hotspot_type]);
        })
        return hotspots;
    }

    return {
        getAllHotspotsForCurrentDealership: getAllHotspotsForCurrentDealership,
        getCurrentHotspotsByType: getCurrentHotspotsByType,
        getCurrentHotspotPhoto: getCurrentHotspotPhoto,
        getHotspotsWithPhotos: getHotspotsWithPhotos,
        getHotspotsByGivenType: getHotspotsByGivenType
    };
};

const useDeleteUpload = () => {
    const dbRequest = useDbRequest();
    const pageSetters = usePageSetters();
    const pageRequest = usePageRequest();
    const [uploadURL,] = useAtom(URL.upload);
    const [, getCurrentSelection] = useRSelection();
    const [token,] = useAtom(user.tokenAtom);
    const [image, setImage] = useState();


    const deleteImage = async (image) => {
        let x = await FS.deleteFile(image.image_data);
        // console.log(x);
        if (x) {
            await dbRequest.requestFunction(async () => { await imagesService.deleteImageById([image.image_id]) });
        }
    }

    const getBlobData = async () => {
        let fileData = await FS.showPicture(image.image_data);
        const response = await fetch(fileData);
        const blob = await response.blob();
        const fileName = image.image_data.slice(image.image_data.lastIndexOf('/') + 1);
        blob.name = fileName;
        return blob;
    }

    const createFormData = async () => {
        const carVin = await dbRequest.requestFunction(async () => { return await vehiclesService.getVehicleById([getCurrentSelection().vehicle_id]) });
        const objForUpload = {
            token: token,
            dealership: getCurrentSelection().dealership_id,
            hotspot: getCurrentSelection().hotspot_id,
            image: await getBlobData(),
            vin: carVin.vehicle_vin
        };

        const formData = new FormData();
        for (let item in objForUpload) {
            if (item === 'image') {
                formData.append(item, objForUpload[item], objForUpload[item].name);
            } else {
                formData.append(item, objForUpload[item])
            }
        }
        return formData;
    }

    const uploadImage = async (image) => {
        setImage(image);
        const data = await createFormData();

        const request = new XMLHttpRequest();
        request.open('POST', uploadURL);

        request.upload.addEventListener('progress', (e) => {
            const percent = e.loaded / e.total;
            console.log(percent);
        });
        request.addEventListener('load', async (e) => {
            console.log(request.status, 'status');
            console.log(request.response, 'response');
            if (request.status === 200) {
                await dbRequest.requestFunction(async () => { await imagesService.deleteImageById([image.image_id]) });
            }
        });

        let x = request.send(data);

        console.log(x, 'x');

        // const response = await fetch(uploadURL, {
        //     method: 'POST',

        // });
        // console.log(uploadURL, "upload");
        // pageSetters.setUrl(uploadURL);
        // pageSetters.setFormData(obj);
        // pageSetters.setRequestBody();
        // let x = await pageSetters.fetch();
        // console.log(x);


        // const formData = new FormData();
        // formData.append('file', blob, "image.jpg");
        // this.uploadData(formData);

        // console.log('upload image', blob);
    }
    // const deleteCar = async (vehicle_id) => {
    return {
        deleteImage: deleteImage,
        uploadImage: uploadImage
    }
}

export { useRSelection, useHotspot, useDeleteUpload };