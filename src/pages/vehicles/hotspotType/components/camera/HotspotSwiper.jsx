import { IonCol, IonImg, IonButton, IonSpinner } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRSelection } from '../../../../../services/customHooks/utilityHooks';
import { Navigation } from 'swiper';
import { useHotspot } from '../../../../../services/customHooks/utilityHooks';
import { useHistory } from 'react-router';
import { FS } from '../../../../../packages/filesystem';
import useCamera from '../../../../../packages/camera/features/CameraCustomHook';
import './hotspotSwiper.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { useLanguage } from '../../../../../packages/multiLanguage';

const HotspotSwiper = () => {
    const [translate] = useLanguage();
    const hotspotHook = useHotspot();
    const [editCurrentSelection, getCurrentSelection] = useRSelection();
    const [slides, setSlides] = useState(null);
    const [swiper, setSwiper] = useState(null);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);
    const camera = useCamera();

    const getPicture = async () => {
        try {
            setImageLoading(true);
            const imageObj = await hotspotHook.getCurrentHotspotPhoto(getCurrentSelection().hotspot_id);
            if (imageObj.length > 0) {
                const img = await FS.showPicture(imageObj[0].image_data);
                console.log('ffs ', img, ' ffs', imageObj[0])
                if (img === undefined) {
                    setImage(null);
                } else {
                    setImage(img);
                }
            } else {
                setImage(null);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setImageLoading(false);
        }

    }

    const takePictureHandler = async () => {
        await camera.takePicture(getCurrentSelection().hotspot_id, getCurrentSelection().vehicle_id);
        if (swiper.activeIndex === swiper.slides.length - 1) {
            swiper.slideTo(0);
        } else {
            swiper.slideNext();
        }
    }

    const selectInitialSlide = async (hotspots) => {
        const currentHotspot = await getCurrentSelection().hotspot_id;
        const index = hotspots.findIndex((hotspot) => hotspot.hotspot_id === currentHotspot);
        await swiper.slideTo(index);
    }

    useEffect(() => {
        (async () => {
            const hotspots = await hotspotHook.getCurrentHotspotsByType();
            setSlides(hotspots);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (swiper !== null) {
                const hotspots = await hotspotHook.getCurrentHotspotsByType();
                await selectInitialSlide(hotspots);
                await getPicture();
            }
        })();
    }, [swiper]);

    const pictureClickHandler = async (e) => {
        const fullImageContainer = document.querySelector('.full-image-container');
        const smallImage = document.querySelector('.small-image');
        fullImageContainer.parentNode.parentNode.classList.add('show');
        document.querySelector(".image-full").src = e.target.src;
    }

    return (
        <>
            <IonCol size='3' className={'image-col'}>
                <div className="img-container small-image" >
                    {
                        imageLoading ?
                            // true ?
                            <IonSpinner name="lines-sharp"></IonSpinner> :
                            <IonImg src={image !== null ? image : '/assets/img/carPicPlaceholder.png'}
                                onClick={image !== null ? pictureClickHandler : null}
                            ></IonImg>
                    }
                </div>
            </IonCol>
            <IonCol size='6' className="ion-text-center">
                <IonButton className='take-picture-btn'
                    onClick={takePictureHandler}
                ></IonButton>
            </IonCol>

            <IonCol size='12'>
                <Swiper
                    modules={[Navigation]}
                    navigation
                    slidesPerView={1}
                    initialSlide={0}

                    onSlideChange={
                        async swiper => {
                            try{
                                const id = await swiper.slides[swiper.activeIndex].getAttribute('data-id');
                                editCurrentSelection({ hotspot_id: parseInt(id)});
                                await getPicture();

                            } catch (err) {
                                    console.log(err);
                            }
                            // console.log(swiper, swiper.slides[swiper.activeIndex], id);
                            // console.log('id ', id)
                        }
                    }
                    onInit={(swiper) => {
                        setSwiper(swiper);
                    }}
                >
                    {slides?.map((hotspot) =>
                        <SwiperSlide
                            className='ion-text-center'
                            data-id={hotspot.hotspot_id}
                            key={hotspot.hotspot_id}
                        >
                            {translate(`${hotspot.hotspot_name}`)}
                        </SwiperSlide>)}
                </Swiper>
            </IonCol>
        </>
    )
}

export default HotspotSwiper