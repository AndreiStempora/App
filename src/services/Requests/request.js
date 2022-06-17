import { atom } from "jotai";
import { error } from "../../packages/errors/index";
import { user } from "../user/user";
import { reqBody } from "./requestBody";
import { formAtoms } from "../../packages/form";

const request={
    URLAtom:atom("",
        (_get,set,newVal)=>{
            set(request.URLAtom,newVal);
        }
    ),

    loadingIndicatorAtom:atom(false,
        (get,set)=>{
            set(request.loadingIndicatorAtom,!get(request.loadingIndicatorAtom))
        }
    ),

    requestAtom:atom({},
        async (get,set)=>{            
            const func = async()=>{
                try{
                    const response = await fetch(get(request.URLAtom),get(reqBody.requestBodyAtom));
                    let data = await response.json();

                    set(formAtoms.formDataAtom,"RESET")
                    set(request.requestAtom,data);
                    
                    if(data?.token){
                        set(user.tokenAtom,data.token)
                    }
                    return data;
                } catch (e) {
                    console.log(e,"error in fetch")
                    set(error.errorAtom,await e.toString())  
                }
            }
            
            return func();
        }
    )
}

export { request };

