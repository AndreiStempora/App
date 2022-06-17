import { atomWithStorage } from "jotai/utils";

const user = {
    loggedIn:   atomWithStorage("user",false),
    tokenAtom : atomWithStorage("token","")
}

export { user };


