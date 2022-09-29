import { IonSlides, IonSlide, IonContent } from '@ionic/react';
import { useEffect, useState } from 'react';
import { DB, useDbRequest, dealershipsService, vehiclesService, settingsService, hotspotsService, imagesService } from "../../../packages/database";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

const PictureSwiper = () => {
    const dbRequest = useDbRequest();
    const [numberOfSlides, setNumberOfSlides] = useState(null);

    

    const createSlides = (val) => {
        let slides = [];
        for (let i = 1; i <= val; i++) {
            slides.push(<SwiperSlide className='ion-text-center' key={i}>Slide {i}</SwiperSlide>)
        }
        return slides;
    }

    


    useEffect(() => {
        (async() => {
            //get userSelectedDealership from local storage
            const userSelectedDealership = localStorage.getItem('userSelectedDealership');
            const settings = await dbRequest.requestFunction(async() =>await settingsService.getAllSettingsByDealershipId([userSelectedDealership]));
            //find setting with setting_name exterior and return setting_value
            const exteriorSetting = settings.find(setting => setting.setting_name === 'exterior');
            console.log(settings);
            const slides = createSlides(exteriorSetting.setting_value);
            console.log(slides)
            setNumberOfSlides(slides);
            console.log(numberOfSlides)
        })()
    }, []);

    return (
        <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={1}
        >
            {numberOfSlides}
        </Swiper>
    )
}

export default PictureSwiper