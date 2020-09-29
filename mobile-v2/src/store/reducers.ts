import { combineReducers } from "redux";

import { profileModule } from "./profile";

export const reducers = combineReducers({
    profile: profileModule.reducer
});