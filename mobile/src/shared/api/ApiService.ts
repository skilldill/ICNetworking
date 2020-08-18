import { httpClient, HEADERS } from "./httpClient";
import { API_URLS } from "shared/constants";

export class ApiServise {
    static authorization = (identifier: string, password: string) => {
        return httpClient.post(API_URLS.auth, { identifier, password }, {
            headers: HEADERS
        });
    }
    
    static getSkills = () => {
        return httpClient.get(API_URLS.skills, { headers: HEADERS });
    }
    
    
    // USER INFO
    static getUserInfo = (uid: string) => {
        return httpClient.get(`${API_URLS.userInfo}/${uid}`, { headers: HEADERS })
    }

    static setUserInfo = (data: any) => {
        return httpClient.post(API_URLS.userInfo, data, { headers: HEADERS });
    }

    static updateUserInfo = (uid: string, data: any) => {
        return httpClient.put(`${API_URLS.userInfo}/${uid}`, data, { headers: HEADERS });
    }
}