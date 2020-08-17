import axios from "axios"
import { API_URLS } from "shared/constants";

export const HEADERS = {
    "Content-Type": "application/json",
    "Authorization": ""
}

export const httpClient = axios.create({
    baseURL: API_URLS.base
});

export const updateTokenHttpClient = (jwt: string) => {
    HEADERS["Authorization"] = `Bearer ${jwt}`;
}
