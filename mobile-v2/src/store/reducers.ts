import { combineReducers } from "redux";

import { profileModule } from "./profile";
import { colleguesModule } from "./collegues";
import { listsModule } from "./lists";
import { keyboardModule } from "./keyboard";

export const reducers = combineReducers({
    profile: profileModule.reducer,
    collegues: colleguesModule.reducer,
    lists: listsModule.reducer,
    keyboard: keyboardModule.reducer
});