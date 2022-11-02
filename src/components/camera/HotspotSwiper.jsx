import { IonSlides, IonSlide, IonContent } from '@ionic/react';
import { useEffect, useState } from 'react';
import { DB, useDbRequest, dealershipsService, vehiclesService, settingsService, hotspotsService, imagesService } from "../../packages/database";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAtom } from 'jotai';
import { user } from '../../services/user/user';
import 'swiper/css';
import 'swiper/css/navigation';

const HotspotSwiper = ({hotspot_id, setHotspot_id}) => {
    const dbRequest = useDbRequest();
    const [slides, setSlides] = useState(null);
    const [allHotspots, setAllHotspots] = useState(null);
    const [currentSelection] = useAtom(user.userCurrentSelections);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        (async() => {
            const hotspots = await dbRequest.requestFunction(async() => await hotspotsService.getAllHotspotsByDealershipId([currentSelection.dealership_id]));
            const outer = [];
            const inner = [];

            hotspots.forEach(hotspot => {
                if(hotspot.hotspot_type === 2){
                    outer.push(hotspot);
                }else{
                    inner.push(hotspot);
                }
            });
            setSlides([...outer,...inner]);

            if(hotspot_id){
                const index = slides.findIndex(hotspot => hotspot.hotspot_id === hotspot_id)
                setStartIndex(index);
                console.log(index,'index')
            } 

            console.log(startIndex);
        })()
    }, []);

    return (
        <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={1}
            initialSlide={startIndex}
            onSlideChange={(swiper) => {console.log(swiper.slides[swiper.activeIndex]);
                // const id = swiper.slides[swiper.activeIndex].getAttribute('data-id'); 
                // setHotspot_id(id)
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
    )
}

export default HotspotSwiper