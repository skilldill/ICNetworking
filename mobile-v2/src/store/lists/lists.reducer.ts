import { handleActions, Action } from "redux-actions";

import { ListsState } from "./lists.model";
import { LISTS_ACTION_TYPES } from "./lists.actions";

const initialState: ListsState = {
    positions: [],
    interests: [],
    departments: [],
    loading: false
}

const setPositions = (state: ListsState, action: Action<any[]>): ListsState => ({
    ...state,
    positions: action.payload
})

const setInterests = (state: ListsState, action: Action<any[]>): ListsState => ({
    ...state,
    interests: action.payload
})

const setDepartments = (state: ListsState, action: Action<any[]>): ListsState => ({
    ...state,
    departments: action.payload
})

const setLoading = (state: ListsState, action: Action<any>): ListsState => ({
    ...state,
    loading: action.payload
})

export const mapReducers = {
    [LISTS_ACTION_TYPES.SET_POSITIONS]: setPositions,
    [LISTS_ACTION_TYPES.SET_INTERESTS]: setInterests,
    [LISTS_ACTION_TYPES.SET_DEPARTMENTS]: setDepartments,
    [LISTS_ACTION_TYPES.SET_LOADING]: setLoading
}

export const listsReducer = handleActions(mapReducers, initialState);