import { handleActions, Action } from "redux-actions";

import { MatchesState } from "./matches.model";
import { MATCHES_ACTION_TYPES } from "./matches.actions";

const initialState: MatchesState = {
    matches: [],
    selectedIds: [],
    loading: false,
    selectMode: false,
}

const setMatches = (state: MatchesState, action: Action<any[]>): MatchesState => ({
    ...state,
    matches: action.payload
})

const setLoading = (state: MatchesState, action: Action<any>): MatchesState => ({
    ...state,
    loading: action.payload
})

const setSelectMode = (state: MatchesState, action: Action<any>): MatchesState => ({
    ...state,
    selectMode: action.payload
})

const selectMatchId = (state: MatchesState, action: Action<any>): MatchesState => {
    const includesToSelected = state.selectedIds.includes(action.payload);
    
    if (includesToSelected) {
        const filtredIds = state.selectedIds.filter((id) => id !== action.payload);
        return { ...state, selectedIds: filtredIds };
    }

    return { ...state, selectedIds: [...state.selectedIds, action.payload] }
}

const mapReducers = {
    [MATCHES_ACTION_TYPES.SET_MATCHES]: setMatches,
    [MATCHES_ACTION_TYPES.SET_LOADING]: setLoading,
    [MATCHES_ACTION_TYPES.SET_SELECT_MODE]: setSelectMode,
    [MATCHES_ACTION_TYPES.SELECT_MATCH_ID]: selectMatchId
}

export const matchesReducer = handleActions(mapReducers, initialState);