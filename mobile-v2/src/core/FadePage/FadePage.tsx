import React, { FC, useMemo, CSSProperties, useCallback } from "react";
import "./style.scss";

interface FadePageProps {
  show: boolean,
  direction: "vertical" | "horizontal"
}

export const FadePage: FC<FadePageProps> = (props) => {
  const { children, show, direction } = props;

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