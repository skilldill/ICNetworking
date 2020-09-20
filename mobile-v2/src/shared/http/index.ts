import axios from "axios";
import { serviceOptions } from "./api";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || ""; 

export let http = axios.create({
    baseURL: BASE_URL
});

export const initApi = (token?: string) => {
    if (!!token) {
        http = axios.create({
            headers: { "Authorization": token }
        })
    }

    serviceOptions.axios = http;
}