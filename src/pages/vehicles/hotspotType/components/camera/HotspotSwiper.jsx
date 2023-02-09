import { IonCol, IonImg, IonButton, IonSpinner } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRSelection } from '../../../../../packages/database/features/utils/utilityHooks';
import { Navigation } from 'swiper';
import { useHotspot } from '../../../../../packages/database/features/utils/utilityHooks';
import { useHistory } from 'react-router';
import { FS } from '../../../../../packages/filesystem';
import useCamera from '../../../../../packages/camera/features/CameraCustomHook';
import './hotspotSwiper.scss';
import 'swiper/css';
import 'swiper/css/navigation';

const HotspotSwiper = ({setHidePageContent}) => {
    const hotspotHook = useHotspot();
    const [editCurrentSelection, getCurrentSelection] = useRSelection();
    const [slides, setSlides] = useState(null);
    const [swiper, setSwiper] = useState(null);
    const [image, setImage] = useState(null);
    const history = useHistory();
    const [imageLoading, setImageLoading] = useState(true);
    const camera = useCamera();

    const getPicture = async () => {
        try {
            const imageObj = await hotspotHook.getCurrentHotspotPhoto(getCurrentSelection().hotspot_id);
            if (imageObj.length > 0) {
                const img = await FS.showPicture(imageObj[0].image_data);
                setImage(img);
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
            await getPicture();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (swiper !== null) {
                const hotspots = await hotspotHook.getCurrentHotspotsByType();
                await selectInitialSlide(hotspots);
            }
        })();
    }, [swiper]);

    const pictureClickHandler = async (e) => {
        const fullImage = document.querySelector('.full-image-container')
        fullImage.parentNode.classList.add('show');
        fullImage.style.backgroundImage = `url(${e.target.src})`;
    }

    return (
        <>
            <IonCol size='3' className={'image-col'}>
                <div className="img-container" >
                    {
                        imageLoading ?
                            <IonSpinner name="lines-sharp"></IonSpinner> :
                            <IonImg src={image !== null ? image : '/assets/img/carPicPlaceholder.png'}
                            onClick={image !== null ? pictureClickHandler:null}
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
                    onSlideChange={async (swiper) => {
                        const id = swiper.slides[swiper.activeIndex].getAttribute('data-id');
                        editCurrentSelection({ hotspot_id: parseInt(id) });
                        await getPicture();
                    }}
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
                            {hotspot.hotspot_name}
                        </SwiperSlide>)}
                </Swiper>
            </IonCol>
        </>
    )
}

export default HotspotSwiper