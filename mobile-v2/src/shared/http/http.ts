import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

export let http = axios.create({
    baseURL: BASE_URL
});

export const initApi = (token?: string) => {
    try {
        if (!!token) {
            const headers = { "Authorization": token };
            http = axios.create({ headers, baseURL: BASE_URL });
            return;
        }
    
        http = axios.create({ baseURL: BASE_URL });
        return;
    } catch(error) {
        http = axios.create({ baseURL: BASE_URL });

        console.log(error.message);
    }
}