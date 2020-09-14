import React, { FC, useRef, useEffect } from "react";
import { Input as AntInput } from "antd";
import { InputProps } from "antd/lib/input";

import "./style.scss";
import { CrossInputSVG } from "assets/icons";

export interface CustomInputProps extends InputProps {
  label?: string,
  onClear?: () => void,
  isFocus?: boolean,
  showClear?: boolean
}

export const Input: FC<CustomInputProps> = (props) => {
  const { label, onClear, isFocus, showClear, ...rest } = props;
  const input = useRef<AntInput>(null);

  const handleClear = () => {
    !!onClear && onClear();
  }

  // TODO: SHOULD FIX THIS CRUTCH FOR FOCUS
  useEffect(() => {
    if (isFocus && !!input.current) {
      input.current.focus();
    } 
  }, [isFocus, input.current])

  return (
    <div className="control-input">
      {!!label && <small>{label}</small>}
      <AntInput {...rest} ref={input} />
      {(!!onClear && showClear) && (
        <button className="clear-btn" onClick={handleClear}>
          <img src={CrossInputSVG} alt="clear"/>
        </button>
      )}
    </div>
  )
}