import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const user = {
    loggedIn:   atomWithStorage("user",false),
    tokenAtom : atomWithStorage("token",""),
    getLoggedIn: atom(null,(get,set,update)=>{
        set(user.loggedIn,update);
        return get(user.loggedIn)
    }),
    currentPath: atomWithStorage("lastPage",[]),
    userDetails: atomWithStorage("userDetails",{}),
    userCurrentSelections: atomWithStorage("userCurrentSelections",{dealership_id:null,vehicle_id:null,vehicle_photo_id:null}),
    getCurrentSelections: atom(null,
        (get,set,update)=>{
            return get(user.userCurrentSelections);
        })
}

export { user };


