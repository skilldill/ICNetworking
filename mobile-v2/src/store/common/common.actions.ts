import { createAction } from "redux-actions";

export const COMMON_ACTION_TYPES = {
  SET_SHOW_KEYBOARD: "COMMON.SET_SHOW_KEYBOARD",
  SET_SHOW_TABBAR: "COMMON.SET_SHOW_TABBAR",
  SET_WITH_BROW: "COMMON.SET_WITH_BROW"
}

class CommonActions {
  setShowKeyboard = createAction(COMMON_ACTION_TYPES.SET_SHOW_KEYBOARD);
  setShowTabbar = createAction(COMMON_ACTION_TYPES.SET_SHOW_TABBAR);
  setWithBrow = createAction(COMMON_ACTION_TYPES.SET_WITH_BROW);
}

export const commonActions = new CommonActions();