import { handleActions, Action } from "redux-actions";

import { MatchesState } from "./matches.model";
import { MATCHES_ACTION_TYPES } from "./matches.actions";

const initialState: MatchesState = {
    matches: [],
    selectedIds: [19, 29],
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

const mapReducers = {
    [MATCHES_ACTION_TYPES.SET_MATCHES]: setMatches,
    [MATCHES_ACTION_TYPES.SET_LOADING]: setLoading
}

export const matchesReducer = handleActions(mapReducers, initialState);