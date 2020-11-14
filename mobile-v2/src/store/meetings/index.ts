import { meetingsActions } from "./meetings.actions";
import { meetingsReducer } from "./meetings.reducer";
import { meetingsSelector } from "./meetings.selector";

export const meetingsModule = {
    actions: meetingsActions,
    reducer: meetingsReducer,
    selector: meetingsSelector
}