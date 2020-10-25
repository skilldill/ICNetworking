import { matchesActions } from "./matches.actions";
import { matchesSelector } from "./matches.selector";
import { matchesReducer } from "./matches.reducer";

export const matchesModule = {
    actions: matchesActions,
    selector: matchesSelector,
    reducer: matchesReducer
}