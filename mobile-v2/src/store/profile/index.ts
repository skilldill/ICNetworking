import { profileActions } from "./profile.actions";
import { profileReducer } from "./profile.reducer";
import { profileSelector } from "./profile.selector";

export const profileModule = {
    actions: profileActions,
    reducer: profileReducer,
    selector: profileSelector
}