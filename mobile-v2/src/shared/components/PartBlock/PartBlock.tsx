import React, { FC } from "react";
import "./style.scss";

interface PartBlockProps {
  title?: string
}

export const PartBlock: FC<PartBlockProps> = (props) => {
  const  { title, children } = props;

  return (
    <div className="part-block">
      {!!title && <h3>{title}</h3>}
      {children}
    </div>
  )
}