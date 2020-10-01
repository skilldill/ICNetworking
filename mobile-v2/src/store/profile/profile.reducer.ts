import { handleActions, Action } from "redux-actions";

import { ProfileState } from "./profile.model";
import { profileActionTypes } from "./profile.actions";
import { StatusesUsing, StorageKeys } from "shared/constants";

const initialState: ProfileState = {
    profile: null,
    
    profileId: null,
    userId: null,

    loading: false,
    status: null
}

const setProfile = (state: ProfileState, action: Action<any>) => ({
    ...state,
    profile: action.payload
})

const setProfileId = (state: ProfileState, action: Action<number>) => ({
    ...state,
    profileId: action.payload
})

const setUserId = (state: ProfileState, action: Action<number>) => ({
    ...state,
    userId: action.payload
})

const setLoading = (state: ProfileState, action: Action<any>) => ({
    ...state,
    loading: action.payload
})

const setStatusUsing = (state: ProfileState, action: Action<any>) => ({
    ...state,
    status: action.payload
})

const resetState = (state: ProfileState, action: Action<any>) => ({
    profile: null,
    profileId: null,
    userId: null,
    loading: false,
    status: null
})

const mapReducers = {
    [profileActionTypes.SET_PROFILE]: setProfile,
    [profileActionTypes.SET_PROFILE_ID]: setProfileId,
    [profileActionTypes.SET_USER_ID]: setUserId,
    [profileActionTypes.SET_LOADING]: setLoading,
    [profileActionTypes.SET_STATUS_USING]: setStatusUsing,
    [profileActionTypes.RESET_STATE]: resetState
}

export const profileReducer = handleActions(mapReducers, initialState);