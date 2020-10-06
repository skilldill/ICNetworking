import { keyBoardActions } from "./keyboard.actions";
import { keyboardReducer } from "./keyboard.reducer";
import { keyboardSelector } from "./keyboard.selector";

export const keyboardModule = {
  actions: keyBoardActions,
  reducer: keyboardReducer,
  selector: keyboardSelector
}