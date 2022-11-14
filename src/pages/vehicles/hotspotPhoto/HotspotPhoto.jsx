import { IonButtons, IonButton, IonIcon, IonImg, IonSpinner, IonContent } from "@ionic/react";
import { Page, CustomHeader, CustomContent, CustomFooter } from "../../../components/page/Page";
import { useHotspot, useRSelection } from "../../../packages/database/features/utils/utilityHooks";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import CustomBackButton from "../../../components/buttons/CustomBackButton";
import FooterDeleteUpload from "../../../components/footers/FooterDeleteUpload";
import { FS } from "../../../packages/filesystem/index";


const HotspotPhoto = () => {
    const history = useHistory();
    const [image,setImage] = useState();
    const [imageLoading, setImageLoading] = useState(true);
    const hotspotHook = useHotspot();
    const [editCurrentSelection, getCurrentSelection] = useRSelection();

    const getPicture = async () => {
        try{
            const imageObj = await hotspotHook.getCurrentHotspotPhoto(getCurrentSelection().hotspot_id);
            if(imageObj.length > 0){
                // console.log(imageObj);
                const img = await FS.showPicture(imageObj[0].image_data);
                setImage(img);
            } else {
                setImage(null);
            }
        } catch(err){
            console.log(err);
        } finally{
            setImageLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            await getPicture();
        })();
    }, []);

    const deleteHandler = () => {}
    const retakeHandler = () => {}
    const uploadHandler = () => {}
    return (
        <Page pageClass={"hotspot-photo"}>
            <CustomHeader>
                <IonButtons>
                    <CustomBackButton href={'./vehicle-photos'} extraFunction={()=>editCurrentSelection({cameraOn: true})}></CustomBackButton>
                </IonButtons>
            </CustomHeader>
            <IonContent>
                {imageLoading ? <IonSpinner name="crescent" /> : <IonImg src={image} />}
            </IonContent>
            <FooterDeleteUpload del={deleteHandler} retake={retakeHandler} upload={uploadHandler}></FooterDeleteUpload>
        </Page>
    )
}

export default HotspotPhoto;