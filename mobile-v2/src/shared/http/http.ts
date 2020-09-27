import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || ""; 

export let http = axios.create({
    baseURL: BASE_URL
});

export const initApi = (token?: string) => {
    if (!!token) {
        const headers = { "Authorization": token };
        http = axios.create({ headers });
        return;
    }

    http = axios.create({ headers: {} });
    return;
}