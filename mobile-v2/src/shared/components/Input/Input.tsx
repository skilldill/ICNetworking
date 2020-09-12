import React, { FC } from "react";
import { Input as AntInput } from "antd";
import { InputProps } from "antd/lib/input";

import "./style.scss";
import { CrossInputSVG } from "assets/icons";

interface CustomInputProps extends InputProps {
  label?: string,
  onClear?: () => void
}

export const Input: FC<CustomInputProps> = (props) => {
  const { label, onClear } = props;

  const handleClear = () => {
    !!onClear && onClear();
  }

  return (
    <div className="control-input">
      {!!label && <small>{label}</small>}
      <AntInput {...props} />
      {!!onClear && (
        <button className="clear-btn" onClick={handleClear}>
          <img src={CrossInputSVG} alt="clear"/>
        </button>
      )}
    </div>
  )
}