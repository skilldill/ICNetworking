import React, { FC } from "react";
import { Input as AntInput } from "antd";
import { InputProps } from "antd/lib/input";

import "./style.scss";

export const Input: FC<InputProps> = (props) => {
  return (
    <div className="control-input">
      <AntInput {...props} />
    </div>
  )
}