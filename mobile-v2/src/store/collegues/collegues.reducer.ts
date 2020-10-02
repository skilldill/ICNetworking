import { handleActions, Action } from "redux-actions";
import { ColleguesState } from "./collegues.model";
import { COLLEGUES_ACTION_TYPES } from "./colleguse.actions";

const initialState: ColleguesState = {
  collegues: [],
  loading: false,
  page: 1
}

const setCollegues = (state: ColleguesState, action: Action<any[]>) => ({
  ...state,
  collegues: [...state.collegues, ...action.payload]
})

const setLoading = (state: ColleguesState, action: Action<any>) => ({
  ...state,
  loading: action.payload
})

const setPage = (state: ColleguesState, action: Action<any>) => ({
  ...state,
  page: action.payload
})

const mapReducer = {
  [COLLEGUES_ACTION_TYPES.setCollegues]: setCollegues,
  [COLLEGUES_ACTION_TYPES.setLoading]: setLoading,
  [COLLEGUES_ACTION_TYPES.setPage]: setPage
}

export const colleguesReducer = handleActions(mapReducer, initialState);
