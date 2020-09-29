import { handleActions, Action } from "redux-actions";

import { ProfileState } from "./profile.model";
import { profileActionTypes } from "./profile.actions";
import { StorageKeys } from "shared/constants";

const initialState: ProfileState = {
    profile: null,
    
    profileId: null,
    userId: null
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

const mapReducers = {
    [profileActionTypes.SET_PROFILE]: setProfile,
    [profileActionTypes.SET_PROFILE_ID]: setProfileId,
    [profileActionTypes.SET_USER_ID]: setUserId
}

export const profileReducer = handleActions(mapReducers, initialState);