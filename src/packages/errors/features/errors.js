import { atom } from "jotai";

const error = {
    errorAtom : atom("",
        (get,set,update)=>{
            set(error.errorAtom,update)
            if(get(error.errorAtom)){
                set(error.showToastAtom,true);
                setTimeout(()=>{
                    set(error.showToastAtom,false);
                    set(error.errorAtom,"")
                }, 2000)
            }
        }
    ),

    showToastAtom : atom(false)
}

export {error};