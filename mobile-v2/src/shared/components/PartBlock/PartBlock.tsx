import React, { FC, useMemo } from "react";
import cn from "classnames";

import "./style.scss";

interface PartBlockProps {
  title?: any,
  className?: string
}

export const PartBlock: FC<PartBlockProps> = (props) => {
  const  { title, className, children } = props;

  const classes = useMemo(() => cn(["part-block", className]), [className]);
  const titleElement = useMemo(() => typeof title === "string" ? <h3>{title}</h3> : title, [title]);

  return (
    <div className={classes}>
      {!!title && titleElement}
      {children}
    </div>
  )
}