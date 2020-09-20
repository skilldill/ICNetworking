import axios from "axios";
import { serviceOptions } from "./api";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || ""; 

console.log(BASE_URL)

export const http = axios.create({
    baseURL: BASE_URL
});

export const initApi = () => {
    serviceOptions.axios = http;
}