import { Dispatch } from "redux";
import { createAction, Action } from "redux-actions";

export const profileActionTypes = {
    SET_PROFILE: 'PROFILE.SET_PROFILE'
}

export const profileActions = {
    setProfile: createAction<Action<any>>(profileActionTypes.SET_PROFILE),

    fetchProfile: () => async (dispatch: Dispatch) => {

    },

    fetchUser: () => async (dispatch: Dispatch) => {

    }
}