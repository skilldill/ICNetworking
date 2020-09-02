import { useState, useMemo, useCallback, TouchEvent } from "react";

interface useTouchConfig {
  startX?: number,
  startY?: number,
  translateX?: number,
  translateY?: number,
  transition?: boolean,
}

export const useTouch = (config: useTouchConfig) => {
  const { startX = 0, startY = 0, translateX = 0, translateY = 0, transition = false } = config;

  const [stateStartX, setStateStartX] = useState(startX);
  const [stateStartY, setStateStartY] = useState(startY);
  const [stateTranslateX, setStateTranslateX] = useState(translateX);
  const [stateTranslateY, setStateTranslateY] = useState(translateY);
  const [stateTransition, setStateTransition] = useState(transition);

  const addTransitionAnimation = (
    config: { cb?: () => void, transX: number, transY: number, delay: number } = { cb: undefined, transX: 0, transY: 0, delay: 400 }
  ) => {
    const { cb, transX, transY, delay } = config;

    const promiseAnimation = new Promise<NodeJS.Timeout>((resolve) => {
      setStateTransition(true);
        setStateStartY(transY);
        setStateStartX(transX)

        !!cb && cb();

        const timeout = setTimeout(() => {
            resolve(timeout);
        }, delay);
    })

    promiseAnimation
        .then((timeout) => {
            clearTimeout(timeout);
            setStateTransition(false);
        })
  }

  const handleTouchStart = (cb?: () => void) => (event: TouchEvent) => {
    const { touches } = event;
    const { clientX, clientY } = touches[0];

    !!cb && cb();

    setStateStartX(clientX);
    setStateStartY(clientY);
  }

  const handleTouchMove = (cb?: () => void) => (event: TouchEvent) => {
    const { touches } = event;
    const { clientX, clientY } = touches[0];

    const diffX = clientX - stateStartX!;
    const diffY = clientY - stateStartY!;

    setStateTranslateX(diffX);
    setStateTranslateY(diffY);

    !!cb && cb();
  }

  const handleTouchEnd = (cb?: () => void) => (event: TouchEvent) => {
    !!cb && cb();
  }

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    addTransitionAnimation,
    
    setStateTranslateX,
    setStateTranslateY,
    setStateTransition,

    stateStartX,
    stateStartY,
    stateTranslateX,
    stateTranslateY,
    stateTransition
  }
}