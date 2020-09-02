import { useState, useMemo, useCallback, TouchEvent } from "react";

export const useTouch = () => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [transition, setTransition] = useState(false);

  const addTransitionAnimation = (transX = 0, transY = 0, delay = 400) => {
    const promiseAnimation = new Promise<NodeJS.Timeout>((resolve) => {
        setTransition(true);
        setTranslateY(transY);
        setTranslateX(transX)

        const timeout = setTimeout(() => {
            resolve(timeout);
        }, delay);
    })

    promiseAnimation
        .then((timeout) => {
            clearTimeout(timeout);
            setTransition(false);
        })
  }

  const handleTouchStart = (cb?: () => void) => (event: TouchEvent) => {
    const { touches } = event;
    const { clientX, clientY } = touches[0];

    !!cb && cb();

    setStartX(clientX);
    setStartY(clientY);
  }

  const handleTouchMove = (cb?: () => void) => (event: TouchEvent) => {
    const { touches } = event;
    const { clientX, clientY } = touches[0];

    const diffX = clientX - startX;
    const diffY = clientY - startY;

    setTranslateX(diffX);
    setTranslateY(diffY);

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
    
    setTranslateX,
    setTranslateY,
    setTransition,

    translateX,
    translateY,
    transition
  }
}