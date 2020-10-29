import React, { FC, useCallback, useMemo } from "react";
import cn from "classnames";

import "./style.scss";

interface PartBlockProps {
  title?: any,
  className?: string,
  onClick?: () => void,
}

export const PartBlock: FC<PartBlockProps> = (props) => {
  const  { title, className, children, onClick } = props;

  const classes = useMemo(() => cn(["part-block", className]), [className]);
  const titleElement = useMemo(() => typeof title === "string" ? <h3>{title}</h3> : title, [title]);
  const handleClick = useCallback(() => !!onClick && onClick(), [onClick]);

  return (
    <div className={classes} onClick={handleClick}>
      {!!title && titleElement}
      {children}
    </div>
  )
}