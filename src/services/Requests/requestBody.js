import { atom } from "jotai";
import { error } from "../../packages/errors/index";
import { user } from "../user/user";
import { formAtoms } from "../../pages/login/form";

const reqBody = {
    methodAtom : atom("POST"),
    
    modeAtom : atom("cors"),

    requestBodyAtom : atom({},
        (get,set,update)=>{
            try{
                const formData = new FormData();
                const data = get(formAtoms.formDataAtom)
                for(let item in data){
                    formData.append(item, data[item])
                }
                if(get(user.tokenAtom)){
                    formData.append("token",get(user.tokenAtom))
                }
    
                const bodyObj = ()=> {
                    return{
                        method:get(reqBody.methodAtom),
                        mode:get(reqBody.modeAtom),
                        body: formData
                    }
                }
                console.log(data,'ffffffffffff')
                set(reqBody.requestBodyAtom,bodyObj());
            } catch(e){
                set(error.errorAtom,e.message)
            }
        }
    ),

    
}

export { reqBody };

