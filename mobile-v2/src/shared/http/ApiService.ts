import { http } from "./http";
import { API_URLS } from "shared/constants";
import { b64toBlob } from "shared/utils";

interface CommonType {
    [key: string]: any
}

export class ApiService {
    // Users part
    static registartion = (data: CommonType) => {
        return http.post(API_URLS.users, data);
    }

    static login = (data: CommonType) => {
        return http.post(API_URLS.login, data);
    }

    static logout = () => {
        return http.post(API_URLS.logout);
    }

    static getUser = (id: number) => {
        const url = `${API_URLS.users}${id}/`;
        return http.get(url);
    }

    // Profile part
    static getProfile = (id: number) => {
        const url = `${API_URLS.profiles}${id}/`;
        return http.get(url);
    }

    static createProfile = (data: CommonType) => {
        return http.post(API_URLS.profiles, data);
    }

    static updateProfile = (id: number, data: CommonType) => {
        const url = `${API_URLS.profiles}${id}/`;
        return http.patch(url, data);
    }

    static getPosition = () => {

    }

    static createPosition = () => {

    }

    static addPhoto = (id: number, uri: string) => {
        const url = `${API_URLS.profilePhoto}`;
        const formData = new FormData();
        const blob = b64toBlob(uri);

        formData.append("profile", id.toString());
        formData.append("picture", blob);

        return http.post(url, formData);
    }

    // Collegues part
    static getProfiles = () => {
        return http.get(API_URLS.profiles);
    }
}