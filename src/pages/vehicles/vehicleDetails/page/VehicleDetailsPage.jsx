import {IonButtons, IonItem, IonLabel, IonTitle, IonButton, IonIcon} from "@ionic/react";
import {Page, CustomHeader, CustomContent} from "../../../../components/page/Page";
import {useEffect, useState} from "react";
import FooterAddVehicle from "../../../../components/page/pageMainComponents/footers/FooterAddVehicle";
import CustomBackButton from "../../../../components/buttons/CustomBackButton";
import './vehicleDetailsPage.scss';
import useRefreshPage from "../../../../services/customHooks/refreshCurrentPageImproved";
import useVehicleDetailsPage from "../features/vehicleDetailsPageHook";

const VehicleDetailsPage = () => {
      const {refreshPage, history} = useRefreshPage();
      const {
            elements,
            getData,
            goToPhotosHandler,
            addVehicleNameHandler,
            goBackToVehiclesPageHandler,
            translate
      } = useVehicleDetailsPage();


      useEffect(() => {
            (async () => {
                  await refreshPage('/vehicle-details', (async () => {
                        await getData();
                  }))
            })();
      }, [history.location.pathname]);

      // useEffect(() => {
      //     (async () => {
      //         console.log('vehicle details page');
      //         const interior = await hotspotHook.getHotspotsWithPhotos(1);
      //         const exterior = await hotspotHook.getHotspotsWithPhotos(2);
      //         const interiorPhotos = await getPictureCount(interior);
      //         const exteriorPhotos = await getPictureCount(exterior);
      //         const vehicle = await dbRequest.requestFunction(async () => await vehiclesService.getVehicleById([getCurrentSelection().vehicle_id]));
      //         const elements2 = {
      //             interior: interior,
      //             exterior: exterior,
      //             interiorPhotos: interiorPhotos,
      //             exteriorPhotos: exteriorPhotos,
      //             vehicle: vehicle
      //         };
      //         setElements(elements2);
      //     })();
      // }, [getCurrentSelection().vehicle_id ,
      //     getCurrentSelection().refreshPage
      // ]);


      // const goBackToVehiclesPageHandler = () => {
      //     setCurrentSelection('refresh');
      //     history.push('/vehicle-search');
      // }

      return (
          <Page pageClass={'vehicleDetails'}>
                <CustomHeader>
                      <IonButtons slot="start">
                            <CustomBackButton
                                extraFunction={goBackToVehiclesPageHandler}
                            />
                      </IonButtons>
                      <IonTitle className='ion-text-center'>{translate("Vehicle Details")}</IonTitle>
                </CustomHeader>
                <CustomContent colSizesArr={[12, 12]}>
                      <div className="">
                            <IonItem lines="none" className="vehicle-name">
                                  <h3>{translate('Vehicle:')} {elements.vehicle?.vehicle_make} {elements.vehicle?.vehicle_model}</h3>
                                  <IonButton fill='clear' slot="end" onClick={addVehicleNameHandler}><IonIcon
                                      icon='/assets/svgs/edit1.svg'></IonIcon></IonButton>
                            </IonItem>
                            <IonLabel>

                                  <h3>VIN: {elements.vehicle?.vehicle_vin}</h3>
                            </IonLabel>
                      </div>
                      <>
                            <IonButtons className="camera-buttons">
                                  <IonButton onClick={() => {
                                        goToPhotosHandler(1)
                                  }}>
                                        <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon>
                                        <IonLabel>
                                              <h2>{translate("Interior")}</h2>
                                              <h3>{elements?.interiorPhotos} / {elements?.interior?.length}</h3>
                                        </IonLabel>
                                  </IonButton>
                                  <IonButton onClick={() => {
                                        goToPhotosHandler(3)
                                  }}>
                                        <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon>
                                        <IonLabel>{translate("Individual")}</IonLabel>
                                  </IonButton>
                                  <IonButton onClick={() => {
                                        goToPhotosHandler(2)
                                  }}>
                                        <IonIcon icon='/assets/svgs/camera-button.svg'></IonIcon>
                                        <IonLabel>
                                              <h2>{translate("Exterior")}</h2>
                                              <h3>{elements.exteriorPhotos} / {elements.exterior?.length}</h3>
                                        </IonLabel>
                                  </IonButton>
                            </IonButtons>
                            <div className="car-image">
                                  <img src="/assets/img/car-outline.png" alt="car placeholder"/>
                            </div>
                      </>
                </CustomContent>
                <FooterAddVehicle/>
          </Page>
      )
}

export default VehicleDetailsPage;