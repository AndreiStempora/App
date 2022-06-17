import { useState } from "react";
import { IonInput,IonIcon } from "@ionic/react";

const Password = ({field})=>{
    const [toggleIcon, setToggleIcon] = useState("visibility");
    const [showPass, setShowPass] = useState(false);
    const toggleShowPass = () => {
        setShowPass(!showPass);
        showPass ? setToggleIcon("visibility") : setToggleIcon("invisible");
    };
    
    return(
        <>
            <IonInput
                type={showPass ? "text" : "password"}
                placeholder={field.placeholder}
                name={field.name}
                autocomplete="on"
            >
                {field.icon && (
                    <IonIcon icon={field.icon}></IonIcon>
                )}
            </IonInput>
            <IonIcon
                slot="end"
                icon={`assets/svgs/${toggleIcon}.svg`}
                onClick={toggleShowPass}
            ></IonIcon>
        </>
    )
}

export default Password;