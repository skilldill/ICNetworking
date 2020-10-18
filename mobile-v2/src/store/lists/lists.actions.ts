import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { ApiService } from "shared/http";
import { profileModule } from "store/profile";

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

    // SEARCHABLE
    searchPositions = (value: string, isFilter?: boolean) => async (dispatch: Dispatch) => {
        try {
            const { data } = await ApiService.searchPositions(value);
            
            if (value.length === 0) {
                dispatch(this.setPositions([]));
            }

            // Вставляем вводимое значение в список 
            // чтобы пользователь мог создать новое значение
            if (isFilter) {
                dispatch(this.setPositions(data.results));
            } else {
                dispatch(this.setPositions([{ name: value }, ...data.results]));
            }
        } catch(error) {
            console.log(error);
        }
    }

    searchInterests = (value: string, isFilter?: boolean) => async (dispatch: Dispatch) => {
        try {
            const { data } = await ApiService.searchInterests(value);

            if (value.length === 0) {
                dispatch(this.setInterests([]));
            }

            // Вставляем вводимое значение в список 
            // чтобы пользователь мог создать новое значение
            if (isFilter) {
                dispatch(this.setInterests(data.results));
            } else {
                dispatch(this.setInterests([{ name: value }, ...data.results]));
            }
        } catch(error) {
            console.log(error);
        }
    }

    searchDepartments = (value: string, isFilter?: boolean) => async (dispatch: Dispatch) => {
        try {
            const { data } = await ApiService.searchDepartments(value);

            if (value.length === 0) {
                dispatch(this.setDepartments([]));
            }

            // Вставляем вводимое значение в список 
            // чтобы пользователь мог создать новое значение
            if (isFilter) {
                dispatch(this.setDepartments(data.results));
            } else {
                dispatch(this.setDepartments([{ name: value }, ...data.results]));
            }
        } catch(error) {
            console.log(error);
        }
    }

    // CREATE VALUE
    createPosition = (value: { name: string }) => async (dispatch: any, getState: () => any) => {
        const { profile } = getState();
        const { id } = profile.profile;

        try {
            const { data } = await ApiService.createPosition(value);
            dispatch(profileModule.actions.updateProfile(id, { position: data.id }));
        } catch(error) {
            console.log(error);
        }
    }

    createInterest = (value: { name: string }) => async (dispatch: any, getState: () => any) => {
        const { profile } = getState();
        const { id } = profile.profile;

        try {
            const { data } = await ApiService.createInterest(value);
            dispatch(profileModule.actions.updateProfile(id, { interests: [data.id] }));
        } catch(error) {
            console.log(error);
        }
    }

    createDepartment = (value: { name: string }) => async (dispatch: any, getState: () => any) => {
        const { profile } = getState();
        const { id } = profile.profile;

        try {
            const { data } = await ApiService.createDepartment(value);
            dispatch(profileModule.actions.updateProfile(id, { department: data.id }));
        } catch(error) {
            console.log(error);
        }
    }
}

export const listsActions = new ListsActions();