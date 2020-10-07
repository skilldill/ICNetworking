import React, { FC, useMemo } from "react";
import cn from "classnames";

import "./style.scss";

interface PartBlockProps {
  title?: string,
  className?: string
}

export const PartBlock: FC<PartBlockProps> = (props) => {
  const  { title, className, children } = props;

  const classes = useMemo(() => cn(["part-block", className]), [className])

  return (
    <div className={classes}>
      {!!title && <h3>{title}</h3>}
      {children}
    </div>
  )
}