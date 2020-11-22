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

    static addPhoto = (id: number, uri: string) => {
        const url = `${API_URLS.profilePhoto}`;
        const formData = new FormData();
        const blob = b64toBlob(uri);

        formData.append("profile", id.toString());
        formData.append("picture", blob);

        return http.post(url, formData);
    }

    // Collegues part
    static getProfiles = (page: number) => {
        const params = { page };
        return http.get(API_URLS.profiles, { params });
    }

    static filterProfiles = (data: any) => {
        return http.post(API_URLS.profilesFilter, data);
    }

    // Events matches
    static getMatches = () => {
        return http.get(API_URLS.matches);
    }

    /**
     * Deprecated
     * @param profileId 
     * @param collegueProfileId 
     */
    static matching = (profileId: number, collegueProfileId: number) => {
        const params = {
            user_profile: profileId,
	        match_with_user_profile: collegueProfileId
        }
        return http.post(API_URLS.matches, params);
    }

    // Lists
    static getPositions = () => {
        return http.get(API_URLS.positions);
    }

    static getInterests = () => {
        return http.get(API_URLS.interests);
    }

    static getDepartments = () => {
        return http.get(API_URLS.departments);
    }

    // Searchable lists 
    static searchPositions = (value: string) => {
        const url = API_URLS.searchPositions + value;
        return http.get(url);
    }

    static searchInterests = (value: string) => {
        const url = API_URLS.searchIntersts + value;
        return http.get(url);
    }

    static searchDepartments = (value: string) => {
        const url = API_URLS.searchDepartments + value;
        return http.get(url);
    }

    static createPosition = (value: {name: string}) => {
        return http.post(API_URLS.positions, value);
    }

    static createInterest = (value: {name: string}) => {
        return http.post(API_URLS.interests, value);
    }

    static createDepartment = (value: {name: string}) => {
        return http.post(API_URLS.departments, value);
    }

    // Meetings
    static createMeeting = (data: { name: string, participants: number[], dateTime: string }) => {
        const meetingData = {
            name: data.name,
            participants: data.participants,
            "scheduled_for": data.dateTime,
        }

        return http.post(API_URLS.meetings, meetingData);
    }

    // Likes
    static createLike = (profileId: number, collegueProfileId: number) => {
        const data = { 'user_profile': profileId, 'liked_user_profile': collegueProfileId };
        return http.post(API_URLS.likes, data);
    }
}