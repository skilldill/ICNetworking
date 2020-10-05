import { Dispatch } from "redux";
import { createAction } from "redux-actions";

export const LISTS_ACTION_TYPES = {
    SET_POSITIONS: "LISTS.SET_POSITIONS",
    SET_INTERESTS: "LISTS.SET_INTERESTS",
    SET_DEPARTMENTS: "LISTS.SET_DEPARTMENTS",
    SET_LOADING: "LISTS.SET_LOADING"
}

class ListsActions {
    setPositions = createAction(LISTS_ACTION_TYPES.SET_POSITIONS);
    setInterests = createAction(LISTS_ACTION_TYPES.SET_INTERESTS);
    setDepartments = createAction(LISTS_ACTION_TYPES.SET_DEPARTMENTS);
    setLoading = createAction(LISTS_ACTION_TYPES.SET_LOADING);

    fetchPositions = () => async (dispatch: Dispatch) => {
        dispatch(this.setLoading(true));

        try {

        } catch(error) {
            console.log(error.message);
        } finally {
            dispatch(this.setLoading(false));
        }
    }

    fetchInterests = () => (dispatch: Dispatch) => {
        dispatch(this.setLoading(true));

        try {

        } catch(error) {
            console.log(error.message);
        } finally {
            dispatch(this.setLoading(false));
        }
    }

    fetchDepartments = () => (dispatch: Dispatch) => {
        dispatch(this.setLoading(true));

        try {

        } catch(error) {
            console.log(error.message);
        } finally {
            dispatch(this.setLoading(false));
        }
    }
}

export const listsActions = new ListsActions();