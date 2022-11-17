import { IonImg } from "@ionic/react";
import './imageOrPlaceholderComponent.scss';

const ImageOrPlaceholderComponent = ({img}) => {
    return (
        <>
            {
                img?.length ? 
                    <div className="image-container">
                        <IonImg src={img}  />
                    </div>
                
                :
                <IonImg src="/assets/img/carPicPlaceholder.png" className="placeholder"/>
            }
        </>
    )
}

export default ImageOrPlaceholderComponent