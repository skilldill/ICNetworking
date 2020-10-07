import { useCallback, useEffect } from "react";
import { Plugins } from "@capacitor/core"
import { useDispatch, useSelector } from "react-redux";

import { keyboardModule } from "store/keyboard";
import { DELAY_KEYBOARD } from "shared/constants";

export const useKeyboard = () => {
  const { Keyboard } = Plugins;
  const dispatch = useDispatch();
  const { showKeyboard } = useSelector(keyboardModule.selector);

  const openKeyboard = useCallback(() => {
    if (!showKeyboard) {
      return Keyboard.show();
    }
  }, [showKeyboard, Keyboard])

  const hideKeyboard = useCallback(async (cb: () => void) => {
    console.log(showKeyboard);

    if (showKeyboard) {
      try {
        await Keyboard.hide();
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          cb();
          dispatch(keyboardModule.actions.setShowKeyboard(false));
        }, DELAY_KEYBOARD);
      } catch(error) {
        cb();
      }
    } else {
      cb();
    }
  }, [showKeyboard, Keyboard])

  return [openKeyboard, hideKeyboard];
}