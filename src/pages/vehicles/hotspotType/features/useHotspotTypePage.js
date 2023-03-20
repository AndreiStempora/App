import useCamera from "../../../../packages/camera/features/CameraCustomHook";
import {FS} from "../../../../packages/filesystem";
import {useState} from "react";
import {useHistory} from "react-router";
import {useRSelection, useHotspot} from "../../../../services/customHooks/utilityHooks";

const useVehiclePhotoPage = () => {
      const hotspotHook = useHotspot();
      const history = useHistory();
      const [setCurrentSelection, getCurrentSelection] = useRSelection();
      const [hidePageContent, setHidePageContent] = useState(false);
      const [hotspotsWithPhoto, setHotspotsWithPhotos] = useState([]);
      const camera = useCamera();
      const [imageLoading, setImageLoading] = useState(true);

      const openCameraHandler = async () => {
            setHidePageContent(true);
            await camera.startCamera();
      };

      const getCurrentPhotos = async () => {
            const hotspotsWithPhotoLocations = await hotspotHook.getHotspotsWithPhotos(getCurrentSelection().hotspot_type);
            let newEl = Promise.all(hotspotsWithPhotoLocations.map(async (hotspotWithPhoto) => {
                  if (hotspotWithPhoto[1] !== undefined) {
                        const image = await FS.showPicture(hotspotWithPhoto[1]?.image_data)
                        hotspotWithPhoto[1] = image;
                  } else {
                        hotspotWithPhoto[1] = null;
                  }
                  return hotspotWithPhoto;
            }));

            setHotspotsWithPhotos(await newEl);
            setImageLoading(false);
      };

      const backButtonHandler = async () => {
            setCurrentSelection('refresh');
            history.push('/vehicle-details');
      };

      return {
            backButtonHandler,
            openCameraHandler,
            hidePageContent,
            hotspotsWithPhoto,
            imageLoading,
            getCurrentPhotos,
            setHidePageContent,
            camera,
            getCurrentSelection
      }
}

export default useVehiclePhotoPage;