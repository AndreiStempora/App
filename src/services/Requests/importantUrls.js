import { atom } from "jotai";

const rootURL = "https://app.novosteer.me/api/";

const URL = {
    login:atom(`${rootURL}user/auth/fields`),
    authentication:atom(`${rootURL}user/auth/fields`),
    logOut:atom(`${rootURL}user/auth/logout`),
    dealership:atom(`${rootURL}capture/dealerships`),
    inventory:atom(`${rootURL}capture/inventory`),
}

export { URL };

