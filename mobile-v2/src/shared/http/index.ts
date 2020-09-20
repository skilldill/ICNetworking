import axios from "axios";
import { serviceOptions } from "./api";

export const http = axios.create();
export const initApi = () => {
    serviceOptions.axios = http;
}