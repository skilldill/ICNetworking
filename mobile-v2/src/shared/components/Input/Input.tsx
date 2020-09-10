import React, { FC } from "react";
import { Input as AntInput } from "antd";
import { InputProps } from "antd/lib/input";

import "./style.scss";

export const Input: FC<InputProps & { label?: string }> = (props) => {
  const { label } = props;
  return (
    <div className="control-input">
      {!!label && <small>{label}</small>}
      <AntInput {...props} />
    </div>
  )
}