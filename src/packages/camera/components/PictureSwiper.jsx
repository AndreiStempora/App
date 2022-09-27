import { IonSlides, IonSlide, IonContent } from '@ionic/react';
import { useEffect, useState } from 'react';
import { DB, useDbRequest, dealershipsService, vehiclesService, settingsService, hotspotsService, imagesService } from "../../../packages/database";

const PictureSwiper = () => {
    const dbRequest = useDbRequest();
    const [numberOfSlides, setNumberOfSlides] = useState(null);

    const slideOpts = {
        initialSlide: 0,
        speed: 400,
    };

    const createSlides = (val) => {
        let slides = [];
        for (let i = 1; i <= val; i++) {
            slides.push(<IonSlide key={i}>Slide {i}</IonSlide>)
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
            const slides = createSlides(exteriorSetting.setting_value);;
            setNumberOfSlides(slides);
        })()
    }, []);

    return (
        <IonSlides options={slideOpts}>
            {numberOfSlides}
        </IonSlides>
    )
}

export default PictureSwiper