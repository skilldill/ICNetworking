import { listsActions } from "./lists.actions";
import { listsReducer } from "./lists.reducer";
import { listsSelector } from "./lists.selector";

export const listsModule = {
    actions: listsActions,
    reducer: listsReducer,
    selector: listsSelector
}