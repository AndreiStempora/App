import {IonButtons, IonTitle, IonButton, IonLabel, IonList, IonIcon} from "@ionic/react";
import {Page, CustomHeader, CustomContent} from "../../../../components/page/Page";
import {useEffect} from "react";
import {useLanguage} from "../../../../packages/multiLanguage";
import OpenedCameraTakePhoto from "../components/camera/OpenedCameraTakePhoto";
import FooterAddVehicle from "../../../../components/page/pageMainComponents/footers/FooterAddVehicle";
import CustomBackButton from "../../../../components/buttons/CustomBackButton";
import useRefreshPage from "../../../../services/customHooks/refreshCurrentPageImproved";
import HotspotWithPic from "../components/hotspotWithPhotoItem/HotspotWithPic";
import useVehiclePhotoPage from "../features/useHotspotTypePage";
import "./hotspotTypePage.scss";

const VehiclePhotos = () => {
      const [translate] = useLanguage();
      const {refreshPage, history} = useRefreshPage();
      const {
            backButtonHandler,
            openCameraHandler,
            hidePageContent,
            hotspotsWithPhoto,
            imageLoading,
            getCurrentPhotos,
            setHidePageContent,
            camera,
            getCurrentSelection
      } = useVehiclePhotoPage();

      useEffect(() => {
            (async () => {
                  await refreshPage('/vehicle-photos', getCurrentPhotos);
            })();
      }, [history.location.pathname, getCurrentSelection().refreshPage]);

      return (
          <Page pageClass={`vehiclePhotos ${hidePageContent ? 'camera-open' : ''}`}>
                {!hidePageContent ?
                    (
                        <>
                              <CustomHeader>
                                    <IonButtons slot="start">
                                          <CustomBackButton extraFunction={backButtonHandler}/>
                                    </IonButtons>
                                    <IonTitle className='ion-text-center'>{translate("Vehicle Photos")}</IonTitle>
                              </CustomHeader>
                              <CustomContent>
                                    <IonList>
                                          {hotspotsWithPhoto?.map((hotspotWithPhoto, index) => (
                                              <HotspotWithPic
                                                  key={index}
                                                  imageLoading={imageLoading}
                                                  hotspotWithPhoto={hotspotWithPhoto}
                                                  openCamera={openCameraHandler}
                                              >
                                              </HotspotWithPic>
                                          ))}
                                    </IonList>
                                    <div className="centered-camera-button">
                                          <IonButtons>
                                                <IonButton onClick={openCameraHandler}><IonIcon
                                                    icon='/assets/svgs/camera.svg'></IonIcon></IonButton>
                                          </IonButtons>
                                          {/*<IonLabel>Start taking photos of your vehicle</IonLabel>*/}

                                    </div>

                              </CustomContent>
                              <FooterAddVehicle photoBtn={true}/>
                        </>
                    ) : (
                        <OpenedCameraTakePhoto
                            setHidePageContent={setHidePageContent} //camera={camera}
                        />
                    )}
          </Page>
      )
}

export default VehiclePhotos