import { useAtom } from "jotai";
import { IonItem, IonInput, IonLabel, IonIcon, IonButton} from "@ionic/react";
import { useEffect, useState } from "react";
import { formAtoms } from "../features/formAtoms";
import Password from "./Password";
import "./customForm.scss";

const CustomForm = ({submitForm,autofocus}) => {
    const [logInFields] = useAtom(formAtoms.logInForm);
    const [fields,setFields] = useState(logInFields?.fields);
    const [buttons,setButtons] = useState(logInFields?.buttons);
    const [,setData] = useAtom(formAtoms.formDataAtom);
  
    useEffect(()=>{
        setFields(logInFields?.fields)
        setButtons(logInFields?.buttons)
    },[logInFields])

    const submitHandler=(e)=>{
        e.preventDefault();
        
        for(let i = 0;i< e.target.length;i++){
            let elem = e.target[i];
            if(elem.type !== "submit"){
                if(elem.value.slice(-1) === " "){
                    elem.value = elem.value.slice(0,elem.value.length - 1)
                }
                setData({
                    [elem.name]:elem.value
                })
            }
        }              
    }

    const inputTypes = [
        "button",
        "checkbox",
        "color",
        "date",
        "datetime-local",
        "email",
        "file",
        "hidden",
        "image",
        "month",
        "number",
        "password",
        "radio",
        "range",
        "reset",
        "search",
        "submit",
        "tel",
        "text",
        "time",
        "url",
        "week"
    ]

    return (
        <form
            onSubmit={submitHandler}
        >
            {fields?.map((field, index) => (
                <IonItem key={index}>
                    <IonLabel position="stacked">
                        <span>
                            {field.title}
                        </span>
                    {inputTypes.includes(field.type) &&
                        field.type === "password" ? (
                            <Password field={field}></Password>
                        ) : (
                            <IonInput
                                autofocus={index===0?autofocus:false}
                                type={field.type}
                                placeholder={field.placeholder.length?field.name:field.placeholder}
                                name={field.name}
                                autocomplete="on"
                            >
                                {field.icon && (
                                    <IonIcon icon={field.icon}></IonIcon>
                                )}
                            </IonInput>
                        )
                    }
                    </IonLabel>
                </IonItem>
            ))}
            
            <IonButton className="login-btn" type="submit" onClick={submitForm} >{buttons?.sign_in}</IonButton>
        </form>
    );
};

export default CustomForm;
