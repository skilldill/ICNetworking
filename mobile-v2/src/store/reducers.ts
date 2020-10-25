import { combineReducers } from "redux";

import { profileModule } from "./profile";
import { colleguesModule } from "./collegues";
import { listsModule } from "./lists";
import { matchesModule } from "./matches";
import { commonModule } from "./common";

export const reducers = combineReducers({
    profile: profileModule.reducer,
    collegues: colleguesModule.reducer,
    lists: listsModule.reducer,
    matches: matchesModule.reducer,
    common: commonModule.reducer,
});