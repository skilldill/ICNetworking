import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { StatusesUsing, StorageKeys } from "shared/constants";
import { ApiService, initApi } from "shared/http";

export const profileActionTypes = {
    SET_PROFILE: 'PROFILE.SET_PROFILE',
    SET_USER_ID: 'PROFILE.SET_USER_ID',
    SET_PROFILE_ID: 'PROFILE.SET_PROFILE_ID',
    SET_LOADING: 'PROFILE.SET_LOADING',
    SET_STATUS_USING: 'PROFILE.SET_STATUS_USING'
}

class ProfileActions {
    setProfile = createAction(profileActionTypes.SET_PROFILE);
    setProfileId = createAction(profileActionTypes.SET_PROFILE_ID);
    setUserId = createAction(profileActionTypes.SET_USER_ID);
    setLoading = createAction(profileActionTypes.SET_LOADING);
    setStatusUsing = createAction(profileActionTypes.SET_STATUS_USING);

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
            dispatch(this.setProfileId(id));
            localStorage.setItem(StorageKeys.profileId, `${id}`);
        } catch(error) {
            console.log(error.message);
        }
    }

    createUser = (userData: any, cb: () => void) => async (dispatch: Dispatch) => {
        dispatch(this.setLoading(true));
        
        // REMOVE PASSWORD REPEAT FROM FORM VALUES
        const { passwordRepeat, ...data } = userData;
        
        // CRUTCH FOR FIRST_NAME
        data["first_name"] = data["username"];

        try {
            // TODO: Необходимо добавить загрузку
            await ApiService.registartion(data);

            // RETURN TO LOGIN FORM AND ADDITIONAL ACTIONS
            cb();
        } catch (error) {
            console.log(error.message);
        } finally {
            dispatch(this.setLoading(false));
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

    login = (values: any) => async (dispatch: Dispatch) => {
        console.log("LOOOGIIN");
        dispatch(this.setLoading(true));

        try {
            const { data } = await ApiService.login(values);
            const { token, profile_id, user_id } = data;
            
            localStorage.setItem(StorageKeys.token, token);
            localStorage.setItem(StorageKeys.userId, `${user_id}`);

            dispatch(this.setUserId(`${user_id}`));
            initApi(token);
            
            // StatusesUsing нужен для того чтобы
            // форма логина смотрела на свойство status в стейте
            // и реагировала куда редиректить
            if (!!profile_id) {
                localStorage.setItem(StorageKeys.profileId, `${profile_id}`);
                dispatch(this.setStatusUsing(StatusesUsing.default));
            } else {  
                dispatch(this.setStatusUsing(StatusesUsing.edit));
            }

        } catch (error) {
                console.log(error.message);
        } finally {
                dispatch(this.setLoading(false));
        }
    }

    logout = (cb: any) => async (dispatch: Dispatch) => {
        try {
            await ApiService.logout();
            
            console.log('LOGOUTED');

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