import { IonImg } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import './imageOrPlaceholderComponent.scss';

const ImageOrPlaceholderComponent = ({ img, checkmark }) => {
    return (
        <div className="image-component">
            {
                img?.length ?
                    <div className="image-container">
                        <IonImg src={img} />
                    </div>

                    :
                    <IonImg src="/assets/img/carPicPlaceholder.png" className="placeholder" />
            }
            <IonIcon className='car-checkmark' icon="/assets/svgs/VehicleCheck.svg" />
        </div>
    )
}

export default ImageOrPlaceholderComponent