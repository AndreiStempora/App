import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DB, useDbRequest, dealershipsService, vehiclesService, settingsService, hotspotsService, imagesService } from "../../../packages/database";
import { useState, useEffect } from 'react';
import { SlideElement } from './SlideElement';
import { useAtom } from 'jotai';

const SwiperCarousel = ({slideProps,setSwiper}) => {	
	const dbRequest = useDbRequest();
    const [numberOfSlides, setNumberOfSlides] = useState(null);
    const currentDealershipId = useAtom('userSelectedDealership');

    const createSlides = (val) => {
        let slides = [];
        for (let i = 1; i <= val; i++) {
            slides.push(<SwiperSlide key={i} className='ion-text-center'>Slide {i}</SwiperSlide>)
        }
        return slides;
    }

    useEffect(() => {
        (async() => {
    
            const settings = await dbRequest.requestFunction(async() =>await settingsService.getAllSettingsByDealershipId([currentDealershipId]));
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
		onSlideChange={(slide) => console.log(slide.activeIndex,'slide change')}
        onSwiper={(swiper) => setSwiper(swiper)}
        >
            {numberOfSlides}
        </Swiper>
	)
}

export default SwiperCarousel;