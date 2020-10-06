import { createAction } from "redux-actions";

export const KEYBOARD_ACTION_TYPES = {
  SET_SHOW_KEYBOARD: "KEYBOARD.SET_SHOW_KEYBOARD"
}

class KeyboardActions {
  setShowKeyboard = createAction(KEYBOARD_ACTION_TYPES.SET_SHOW_KEYBOARD);
}

export const keyBoardActions = new KeyboardActions();