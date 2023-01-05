import { useAtom } from "jotai";
import { user } from "../../../../services/user/user";
import { useDbRequest, hotspotsService, vehiclesService, imagesService } from "../../index";
import { FS } from "../../../filesystem";
import { URL, usePageSetters, usePageRequest } from "../../../../services";
import { useState, useEffect, useRef } from "react";

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
            return await hotspotsService.getAllHotspotsByDealershipId([dealership_id]);
        })
    }

    const getCurrentHotspotsByType = async () => {
        const dealership_id = getCurrentSelection().dealership_id;
        const hotspot_type = getCurrentSelection().hotspot_type;
        return await dbRequest.requestFunction(async () => {
            return await hotspotsService.getAllHotspotsByDealershipIdAndHotspotType([dealership_id, hotspot_type]);
        })
    }

    const getCurrentHotspotsByGivenType = async (hotspot_type) => {
        const dealership_id = getCurrentSelection().dealership_id;
        return await dbRequest.requestFunction(async () => {
            return await hotspotsService.getAllHotspotsByDealershipIdAndHotspotType([dealership_id, hotspot_type]);
        })
    }

    const getCurrentHotspotPhoto = async (hotspot_id) => {
        const vehicle_id = getCurrentSelection().vehicle_id;
        return await dbRequest.requestFunction(async () => {
            return await imagesService.getImageByVehicleIdAndHotspotId([vehicle_id, hotspot_id]);
        })
    }

    const getHotspotsWithPhotos = async (hotspot_type) => {
        if (hotspot_type === undefined) {
            const vehicle_id = getCurrentSelection().vehicle_id;
            const hotspots = await getAllHotspotsForCurrentDealership();

            return await Promise.all(
                hotspots?.map(async (hotspot) => {
                    const photo = await imagesService.getImageByVehicleIdAndHotspotId([vehicle_id, hotspot.hotspot_id]);
                    return [hotspot, ...photo]
                })
            )
        } else {
            const vehicle_id = getCurrentSelection().vehicle_id;
            const hotspots = await getCurrentHotspotsByGivenType(hotspot_type);

            return await Promise.all(
                hotspots?.map(async (hotspot) => {
                    const photo = await imagesService.getImageByVehicleIdAndHotspotId([vehicle_id, hotspot.hotspot_id]);
                    return [hotspot, ...photo];

                })
            )
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
    // const [image, setImage] = useState();
    // const referanceImage = useRef({});
    // const refImage = referanceImage.current;


    const deleteImage = async (image) => {
        // let x = await FS.deleteFile(image.image_data);
        // // console.log(x);
        // if(x){
        await dbRequest.requestFunction(async () => { await imagesService.deleteImageById([image.image_id]) });
        // }
    }

    const getBlobData = async (image) => {
        let fileData = await FS.showPicture(image?.image_data);
        const response = await fetch(fileData);
        const blob = await response.blob();
        const fileName = image?.image_data.slice(image?.image_data.lastIndexOf('/') + 1);
        blob.name = fileName;
        return blob;
    }

    const createFormData = async (image) => {
        const carVin = await dbRequest.requestFunction(async () => { return await vehiclesService.getVehicleById([getCurrentSelection().vehicle_id]) });
        console.log(carVin, 'carVin')
        const objForUpload = {
            token: token,
            dealership: getCurrentSelection().dealership_id,
            hotspot: getCurrentSelection().hotspot_id,
            image: await getBlobData(image),
            vin: carVin?.vehicle_vin
        };
        console.log(objForUpload, 'objForUpload')

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
        // referanceImage.current = image;
        // setImage(image);
        console.log(image, 'refImage');
        const data = await createFormData(image);
        // console.log(data, 'data');
        // const request = new XMLHttpRequest();
        // request.open('POST', uploadURL);

        // request.upload.addEventListener('progress', (e) => {
        //     const percent = e.loaded / e.total;
        // });

        // request.send(data);
        // console.log(request, 'request1');
        // return status when upload is done
        return data;
        // console.log(response, 'response');

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
        uploadImage: uploadImage,
    }
}

export { useRSelection, useHotspot, useDeleteUpload };