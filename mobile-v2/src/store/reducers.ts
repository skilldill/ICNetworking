import { combineReducers } from "redux";

import { profileModule } from "./profile";
import { colleguesModule } from "./collegues";
import { listsModule } from "./lists";
import { commonModule } from "./common";

export const reducers = combineReducers({
    profile: profileModule.reducer,
    collegues: colleguesModule.reducer,
    lists: listsModule.reducer,
    common: commonModule.reducer
});