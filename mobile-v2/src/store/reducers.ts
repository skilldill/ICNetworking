import { combineReducers } from "redux";

import { profileModule } from "./profile";
import { colleguesModule } from "./collegues";

export const reducers = combineReducers({
    profile: profileModule.reducer,
    collegues: colleguesModule.reducer
});