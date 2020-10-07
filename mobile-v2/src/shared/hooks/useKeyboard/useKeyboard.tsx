import { useCallback } from "react";
import { Plugins } from "@capacitor/core"
import { useDispatch, useSelector } from "react-redux";

import { keyboardModule } from "store/keyboard";

export const useKeyboard = () => {
  const { Keyboard } = Plugins;

  const { showKeyboard } = useSelector(keyboardModule.selector);

  const openKeyboard = useCallback(() => {
    if (!showKeyboard) {
      return Keyboard.show();
    }
  }, [showKeyboard, Keyboard])

  const hideKeyboard = useCallback(() => {
    if (showKeyboard) {
      return Keyboard.hide();
    }
  }, [showKeyboard, Keyboard])

  return [openKeyboard, hideKeyboard];
}