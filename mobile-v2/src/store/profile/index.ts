import { moduleFactory } from "../utils";

import { profileActions } from "./profile.actions";
import { profileReducer } from "./profile.reducer";
import { profileSelector } from "./profile.selector";

export const profileModule = moduleFactory(profileActions, profileReducer, profileSelector);