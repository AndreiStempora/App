import { IonImg } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import './imageOrPlaceholderComponent.scss';

const ImageOrPlaceholderComponent = ({ img, checkmark }) => {
    return (
        <div className="image-component">
                    <div className="image-container">
            {
                img?.length ?
                    <IonImg src={img} />
                          :
                    <IonImg src="/assets/img/carPicPlaceholder.png" className="placeholder" />
            }
                    </div>
            <IonIcon className='car-checkmark' icon="/assets/svgs/VehicleCheck.svg" />
        </div>
    )
}

export default ImageOrPlaceholderComponent