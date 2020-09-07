import React, { ButtonHTMLAttributes, FC, useMemo } from "react";
import cn from "classnames";

import "./style.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorType?: "primary" | "success" | "dangerous"
}

export const Button: FC<ButtonProps> = (props) => {
  const { children, colorType, ...rest } = props;
  const classes = useMemo(() => `control-button control-button-${!!colorType ? colorType : "primary"}`, [colorType]);
  return <button className={classes} {...rest}>{children}</button>
}