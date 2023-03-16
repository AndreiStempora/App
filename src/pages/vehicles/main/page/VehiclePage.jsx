import {IonList, IonTitle, IonButtons, IonButton, useIonAlert, IonIcon} from '@ionic/react';
import {Page, CustomHeader, CustomContent} from '../../../../components/page/Page';
import {useDbRequest, vehiclesService} from '../../../../packages/database';
import {useEffect, useState, useRef} from 'react';
import useUpdateDatabaseSingleDealership from "../features/updateDatabase";
import FooterDeleteUpload from '../../../../components/page/pageMainComponents/footers/FooterDeleteUpload';
import FooterAddVehicle from '../../../../components/page/pageMainComponents/footers/FooterAddVehicle';
import useRefreshPage from '../../../../services/customHooks/refreshCurrentPageImproved';
import useVehiclePage from "../features/handleVehiclePage";
import FileUploader from '../../../../components/uploader/FileUploader';
import VehicleItem from '../components/VehicleItem';
import './vehiclePage.scss';

const VehiclePage = () => {
      const dbRequest = useDbRequest();
      const [cars, setCars] = useState([]);
      const {refreshPage, history} = useRefreshPage();
      const updateDatabase = useUpdateDatabaseSingleDealership();
      const scrollTrackerRef = useRef(false);
      const {deselectAll,
            setCheckValues,
            editVehicleHandler,
            deleteVehicleHandler,
            uploadVehicleHandler,
            elementsRef,
            showCheckbox,
            setShowCheckbox,
            uploading,
            setUploading,
            elementsForUpload,
            getCurrentSelection,
            translate} = useVehiclePage();

      useEffect(() => {
            (async () => {
                  await refreshPage('/vehicle-search', (async () => {
                        await updateDatabase();
                        deselectAll();
                        const cars = await dbRequest.requestFunction(async () => await vehiclesService.getVehiclesWithPics([getCurrentSelection().dealership_id]));
                        setCars(cars);
                  }));
            })()

            return () => {
                  setCars([]);
            }
      }, [history.location.pathname]);

      const scrollHandler = (e) => {
            scrollTrackerRef.current = true;
      }

      return (
          <Page pageClass={'vehiclesSearch'}>
                {uploading ?
                    <FileUploader
                        elements={elementsForUpload}
                        setUploading={setUploading}
                        uploading={uploading}
                    /> :
                    <>
                          <CustomHeader>
                                <IonButtons slot="start">
                                      {showCheckbox ? <IonButton onClick={editVehicleHandler}><IonIcon
                                          icon='/assets/svgs/cancel.svg'/></IonButton> : null
                                      }
                                </IonButtons>

                                <IonTitle className='ion-text-center'>{translate('Vehicles')}</IonTitle>
                                <IonButtons slot="end">
                                      <IonButton onClick={showCheckbox ? setCheckValues : editVehicleHandler}>
                                            {showCheckbox ? <IonIcon icon='/assets/svgs/SelectAll.svg'/> :
                                                <IonIcon icon='/assets/svgs/checklist.svg'></IonIcon>}

                                      </IonButton>
                                </IonButtons>
                          </CustomHeader>
                          <CustomContent colSizesArr={[[12]]} scrollEvents={true} scrollHandler={scrollHandler}>
                                <>
                                      <IonList className='special-list'>
                                            {cars?.map((car, index) =>
                                                <VehicleItem
                                                    ref={(element) => elementsRef.current[index] = element}
                                                    key={index}
                                                    item={car}
                                                    id={car.vehicle_id}
                                                    scrollTrackerRef={scrollTrackerRef}
                                                    showCheckbox={showCheckbox}
                                                    setShowCheckbox={setShowCheckbox}
                                                />
                                            )}
                                      </IonList>
                                </>

                          </CustomContent>
                          {!showCheckbox ? <FooterAddVehicle/> :
                              <FooterDeleteUpload
                                  del={deleteVehicleHandler}
                                  retake={null}
                                  upload={uploadVehicleHandler}
                              ></FooterDeleteUpload>
                          }
                    </>
                }
          </Page>
      )
}
export default VehiclePage;


