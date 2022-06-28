import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const user = {
    loggedIn:   atomWithStorage("user",false),
    tokenAtom : atomWithStorage("token",""),
    getLoggedIn: atom(null,(get,set,update)=>{
        return get(user.loggedIn)
    }),
    currentPath: atomWithStorage("lastPage",[])
}

export { user };


