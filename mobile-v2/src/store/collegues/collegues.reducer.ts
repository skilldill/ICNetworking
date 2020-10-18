import { handleActions, Action } from "redux-actions";
import { FilterTypeNames } from "shared/constants";
import { ColleguesState } from "./collegues.model";
import { COLLEGUES_ACTION_TYPES } from "./colleguse.actions";

const initialState: ColleguesState = {
  collegues: [],
  loading: false,
  page: 1,
  
  filter: {
    type: FilterTypeNames.interest
  }
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

const setFilter = (state: ColleguesState, action: Action<any>) => ({
  ...state,
  filter: action.payload
})

const mapReducer = {
  [COLLEGUES_ACTION_TYPES.SET_COLLEGUES]: setCollegues,
  [COLLEGUES_ACTION_TYPES.SET_LOADING]: setLoading,
  [COLLEGUES_ACTION_TYPES.SET_PAGE]: setPage,
  [COLLEGUES_ACTION_TYPES.SET_FILTER]: setFilter
}

export const colleguesReducer = handleActions(mapReducer, initialState);
