import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { StorageKeys } from "shared/constants";
import { ApiService, initApi } from "shared/http";

export const profileActionTypes = {
    SET_PROFILE: 'PROFILE.SET_PROFILE',
    SET_USER_ID: 'PROFILE.SET_USER_ID',
    SET_PROFILE_ID: 'PROFILE.SET_PROFILE_ID',
}

class ProfileActions {
    setProfile = createAction(profileActionTypes.SET_PROFILE);
    setProfileId = createAction(profileActionTypes.SET_PROFILE_ID);
    setUserId = createAction(profileActionTypes.SET_USER_ID);

    fetchProfile = (profileId: number) => async (dispatch: Dispatch) => {
        try {
            const { data } = await ApiService.getProfile(profileId);
            console.log(data);
            dispatch(this.setProfile(data));
        } catch(error) {
            console.log(error);
        }
    }

    fetchUser = (userId: number) => async (dispatch: Dispatch) => {
        try {
            const { data } = await ApiService.getUser(userId);
            const profileData = { user_data: data };
            console.log(profileData);
            dispatch(this.setProfile(profileData));
        } catch(error) {
            console.log(error);
        }
    }

    createProfile = (profileData: any) => async (dispatch: Dispatch) => {
        try {
            const { data } = await ApiService.createProfile(profileData);
            const { id } = data;
            dispatch(this.setProfile(id));
            localStorage.setItem(StorageKeys.profileId, `${id}`);
        } catch(error) {
            console.log(error.message);
        }
    }

    updateProfile = (profileId: number, profileData: any) => async (dispatch: Dispatch) => {
        try {
            await ApiService.updateProfile(profileId, profileData);
        } catch(error) {
            console.log(error.message);
        }
    }

    addPhoto = (profileId: number, photo: any) => async (dispatch: Dispatch) => {
        try {
            await ApiService.addPhoto(profileId, photo);
        } catch(error) {
            console.log(error.message);
        }
    }

    logout = (cb: any) => async (dispatch: Dispatch) => {
        try {
            await ApiService.logout();

            localStorage.removeItem(StorageKeys.token);
            localStorage.removeItem(StorageKeys.userId);
            localStorage.removeItem(StorageKeys.profileId);

            // OUT TO LOADING PAGE
            cb();
            initApi();
        } catch (error) {
            console.log(error.massage);
        }
    }
}

export const profileActions = new ProfileActions();