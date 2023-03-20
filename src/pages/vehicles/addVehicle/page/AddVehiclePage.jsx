import {IonButtons, IonTitle, IonButton, IonLabel, IonIcon, useIonAlert} from "@ionic/react"
import {Page, CustomHeader, CustomContent} from "../../../../components/page/Page"
import {useEffect} from "react";
import {useLanguage} from "../../../../packages/multiLanguage";
import useAddVehiclePage from "../features/handleAddVehiclePage";
import useRefreshPage from "../../../../services/customHooks/refreshCurrentPageImproved";
import VehicleSearch from "../components/search/VehicleSearch";
import OpenedScanner from "../components/scanner/OpenedScanner";
import "./addVehiclePage.scss"

const AddVehicle = () => {
      const {refreshPage, history} = useRefreshPage();
      const [translate] = useLanguage();
      const {
            setScanResult,
            hidePageContent,
            backToSelectVehiclesHandler,
            disabledSave,
            saveVehicleHandler,
            openScannerHandler,
            setNewCar,
            setDisabledSave,
            scanResult,
            closeScannerHandler
      } = useAddVehiclePage();

      useEffect(() => {
            (async () => {
                  await refreshPage('/vehicle-search', async () => {
                        console.log('setting scan result to empty string');
                        setScanResult('');
                  })
            })()
      }, [history.location.pathname])

      return (
          <Page pageClass={`addVehicle ${hidePageContent ? 'camera-open' : ''}`}>
                {!hidePageContent ?
                    (
                        <>
                              <CustomHeader>
                                    <IonButtons slot="start">
                                          <IonButton
                                              className='ion-text-capitalize blue'
                                              onClick={backToSelectVehiclesHandler}
                                          >{translate("Cancel")}</IonButton>
                                    </IonButtons>
                                    <IonTitle className='ion-text-center'>{translate("Add vehicle")}</IonTitle>
                                    <IonButtons slot="end">
                                          <IonButton
                                              className='ion-text-capitalize blue'
                                              disabled={disabledSave}
                                              onClick={saveVehicleHandler}
                                          >{translate("Save")}</IonButton>
                                    </IonButtons>
                              </CustomHeader>

                              <CustomContent colSizesArr={[[12], [12]]}>
                                    <>
                                          <IonButtons className="ion-justify-content-between">
                                                <IonLabel>{translate("VIN number")}</IonLabel>
                                                <IonButton
                                                    onClick={openScannerHandler}
                                                    className="ion-text-right"
                                                >
                                                      <IonIcon icon={'./assets/svgs/scanner.svg'}></IonIcon>
                                                </IonButton>
                                          </IonButtons>
                                          <VehicleSearch
                                              newCar={setNewCar}
                                              disableSave={setDisabledSave}
                                              scanResult={scanResult}>
                                          </VehicleSearch>
                                    </>
                                    <IonButtons className="ion-justify-content-center">

                                    </IonButtons>
                              </CustomContent>
                        </>
                    ) : (
                        <OpenedScanner close={closeScannerHandler}></OpenedScanner>)}
          </Page>
      )
}


export default AddVehicle