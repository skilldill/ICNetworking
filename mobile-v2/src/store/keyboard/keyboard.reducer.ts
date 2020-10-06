import { handleActions, Action } from "redux-actions";
import { KEYBOARD_ACTION_TYPES } from "./keyboard.actions";
import { KeyboardState } from "./keyboard.model";

const initialState: KeyboardState = {
  showKeyboard: true
}

const setShowKeyboard = (state: KeyboardState, action: Action<any>): KeyboardState => ({
  ...state,
  showKeyboard: action.payload
})

const mapReducers = {
  [KEYBOARD_ACTION_TYPES.SET_SHOW_KEYBOARD]: setShowKeyboard 
}

export const keyboardReducer = handleActions(mapReducers, initialState);