import { createAction } from "redux-actions";

export const COMMON_ACTION_TYPES = {
  SET_SHOW_KEYBOARD: "COMMON.SET_SHOW_KEYBOARD",
  SET_SHOW_TABBAR: "COMMON.SET_SHOW_TABBAR"
}

class CommonActions {
  setShowKeyboard = createAction(COMMON_ACTION_TYPES.SET_SHOW_KEYBOARD);
  setShowTabbar = createAction(COMMON_ACTION_TYPES.SET_SHOW_TABBAR);
}

export const commonActions = new CommonActions();