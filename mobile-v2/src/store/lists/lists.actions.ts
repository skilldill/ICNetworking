import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { ApiService } from "shared/http";

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
            const { data } = await ApiService.getPositions();
            dispatch(this.setPositions(data.results));
        } catch(error) {
            console.log(error.message);
        } finally {
            dispatch(this.setLoading(false));
        }
    }

    fetchInterests = () => async (dispatch: Dispatch) => {
        dispatch(this.setLoading(true));

        try {
            const { data } = await ApiService.getInterests();
            dispatch(this.setInterests(data.results));
        } catch(error) {
            console.log(error.message);
        } finally {
            dispatch(this.setLoading(false));
        }
    }

    fetchDepartments = () => async (dispatch: Dispatch) => {
        dispatch(this.setLoading(true));

        try {
            const { data } = await ApiService.getDepartments();
            dispatch(this.setDepartments(data.results));
        } catch(error) {
            console.log(error.message);
        } finally {
            dispatch(this.setLoading(false));
        }
    }
}

export const listsActions = new ListsActions();