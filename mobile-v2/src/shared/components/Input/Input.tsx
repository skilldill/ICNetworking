import React, { FC } from "react";
import { Input as AntInput } from "antd";
import { InputProps } from "antd/lib/input";

import "./style.scss";
import { CrossInputSVG } from "assets/icons";

interface CustomInputProps extends InputProps {
  label?: string,
  clear?: boolean
}

export const Input: FC<CustomInputProps> = (props) => {
  const { label, clear } = props;
  return (
    <div className="control-input">
      {!!label && <small>{label}</small>}
      <AntInput {...props} />
      {clear && (
        <button className="clear-btn">
          <img src={CrossInputSVG} alt="clear"/>
        </button>
      )}
    </div>
  )
}