import React, { FC, useMemo, CSSProperties, useCallback, useEffect } from "react";
import "./style.scss";

interface FadePageProps {
  show: boolean,
  direction: "vertical" | "horizontal"
  onOpen?: () => void;
  onClose?: () => void;
}

export const FadePage: FC<FadePageProps> = (props) => {
  const { children, show, direction, onOpen, onClose } = props;

  useEffect(() => {

    // DURATION NEEDS FOR ANIMATION END
    if (!!onOpen && show) {
      const timeout = setTimeout(() => {
        onOpen();
        clearTimeout(timeout);
      }, 300);
    } 

    if (!!onClose && !show) {
      const timeout = setTimeout(() => {
        onClose();
        clearTimeout(timeout);
      }, 300);
    }
  }, [show])

  const fadeStyle = useMemo((): CSSProperties => direction === "horizontal" ? ({ 
    transform: `translateX(${show ? 0 : window.innerWidth}px)` }) : ({
      transform: `translateY(${show ? 0 : window.innerHeight}px)`
    }), [show, direction])

  return (
    <div className="fade-page" style={fadeStyle}>
      {children}
    </div>
  )
}