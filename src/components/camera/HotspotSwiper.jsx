import { IonSlides, IonSlide, IonContent, IonCol, IonImg, IonButton } from '@ionic/react';
import { useEffect, useState } from 'react';
import { DB, useDbRequest, dealershipsService, vehiclesService, settingsService, hotspotsService, imagesService } from "../../packages/database";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAtom } from 'jotai';
import { FS } from '../../packages/filesystem';
import { user } from '../../services/user/user';
import 'swiper/css';
import 'swiper/css/navigation';

const HotspotSwiper = ({ camera }) => {
    const dbRequest = useDbRequest();
    const [slides, setSlides] = useState(null);
    const [allHotspots, setAllHotspots] = useState(null);
    const [currentSelection, setCurrentSelection] = useAtom(user.userCurrentSelections);
    const [, getSelections] = useAtom(user.getCurrentSelections);
    const [swiper,setSwiper] = useState(null);
    const [currentSlidePic, setCurrentSlidePic] = useState(0);
    const [image,setImage] = useState(null);

    const getPicture = async () => {
        const imageObj = await dbRequest.requestFunction(async () => await imagesService.getImageByVehicleIdAndHotspotId([getSelections().vehicle_id, getSelections().hotspot_id]));
        const img = await FS.showPicture(imageObj[0].image_data);
        setImage(img);
    }

    const takePictureHandler = async () => {
        await camera.takePicture(getSelections().hotspot_id, getSelections().vehicle_id);
        swiper.slideNext();
    }


    useEffect(() => {
        (async () => {

            const hotspots = await dbRequest.requestFunction(async () => await hotspotsService.getAllHotspotsByDealershipIdAndHotspotType([currentSelection.dealership_id, currentSelection.hotspot_type]));
            setSlides(hotspots);
            getPicture();
        })();
        console.log()
    }, []);

    return (
        <>
            <IonCol size='3'>
                <div className="img-container" onClick={() => { console.log('click') }}>
                    <IonImg src={image} ></IonImg>
                </div>
            </IonCol>
            <IonCol size='6' className="ion-text-center">
                <IonButton className='take-picture-btn'
                    onClick={takePictureHandler}
                //</IonCol>onClick={takePicture}
                ></IonButton>
            </IonCol>

            <IonCol size='12'>
                <Swiper
                    modules={[Navigation]}
                    navigation
                    slidesPerView={1}
                    initialSlide={0}
                    onSlideChange={(swiper) => {
                        const id = swiper.slides[swiper.activeIndex].getAttribute('data-id');
                        setCurrentSelection({ ...currentSelection, hotspot_id: parseInt(id) });

                    }}
                    onInit={(swiper) => {
                        setSwiper(swiper);
                        // getPicture();
                    }}
                >
                    {slides?.map((hotspot) =>
                        <SwiperSlide
                            className='ion-text-center'
                            data-id={hotspot.hotspot_id}
                            key={hotspot.hotspot_id}
                        >
                            {hotspot.hotspot_name}
                        </SwiperSlide>)}
                </Swiper>
            </IonCol>
        </>
    )
}

export default HotspotSwiper