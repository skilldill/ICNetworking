import { handleActions, Action } from "redux-actions";

import { ProfileState } from "./profile.model";
import { profileActionTypes } from "./profile.actions";

const initialState: ProfileState = {
    profile: null
}

const setProfile = (state: ProfileState, action: Action<any>) => ({
    ...state,
    profile: action.payload
})

const mapReducers = {
    [profileActionTypes.SET_PROFILE]: setProfile
}

export const profileReducer = handleActions(mapReducers, initialState);