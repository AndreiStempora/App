import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { request } from '../../../../../services/Requests/request';

const formAtoms = {
    formDataAtom:atom({},
        (get,set,update)=>{
            if(update !== "RESET"){
                set(formAtoms.formDataAtom,{...get(formAtoms.formDataAtom),...update});
            } else {
                set(formAtoms.formDataAtom,"");
            }
        }
    ),
    logInForm: atomWithStorage("logInForm",{}),
    logInFormSetter:atom(null,
        async (get,set,update)=>{
            const obj = {};
            const req = get(request.requestAtom);
            obj.fields = req?.fields;
            obj.buttons = req?.buttons;
            obj.url = req?.url;
            set(formAtoms.logInForm,obj)
        })
}

export { formAtoms };