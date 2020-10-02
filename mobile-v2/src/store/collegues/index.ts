import { colleguesActions } from "./colleguse.actions";
import { colleguesReducer } from "./collegues.reducer";
import { colleguesSelector } from "./collegues.selector";

export const colleguesModule = {
  actions: colleguesActions,
  reducer: colleguesReducer,
  selector: colleguesSelector
}