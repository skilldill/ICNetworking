import { handleActions, Action } from "redux-actions";
import { COMMON_ACTION_TYPES } from "./common.actions";
import { CommonState } from "./common.model";

const initialState: CommonState = {
  showKeyboard: false,
  showTabbar: true,
  withBrow: false
}

const setShowKeyboard = (state: CommonState, action: Action<any>): CommonState => ({
  ...state,
  showKeyboard: action.payload
})

const setShowTabbar = (state: CommonState, action: Action<any>): CommonState => ({
  ...state,
  showTabbar: action.payload
})

const setWithBrow = (state: CommonState, action: Action<any>): CommonState => ({
  ...state,
  withBrow: action.payload
})

const mapReducers = {
  [COMMON_ACTION_TYPES.SET_SHOW_KEYBOARD]: setShowKeyboard,
  [COMMON_ACTION_TYPES.SET_SHOW_TABBAR]: setShowTabbar,
  [COMMON_ACTION_TYPES.SET_WITH_BROW]: setWithBrow
}

export const commonReducer = handleActions(mapReducers, initialState);