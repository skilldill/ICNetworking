import React, { FC, useRef, useEffect, useMemo, CSSProperties } from "react";
import { Input as AntInput } from "antd";
import { InputProps } from "antd/lib/input";

import "./style.scss";
import { CrossInputSVG, SearchInputSVG } from "assets/icons";

export interface CustomInputProps extends InputProps {
  label?: string,
  onClear?: () => void,
  isFocus?: boolean,
  showClear?: boolean,
  search?: boolean
}

export const Input: FC<CustomInputProps> = (props) => {
  const { label, onClear, isFocus, showClear, search, ...rest } = props;
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

  const styleInput: CSSProperties = useMemo(() => search ? ({
    paddingLeft: "38px"
  }) : ({}), [search])

  return (
    <div className="control-input">
      {!!label && <small>{label}</small>}
      {search && <img className="search-icon" src={SearchInputSVG} alt="поиск" />}
      <AntInput style={styleInput} {...rest} ref={input} />
      {(!!onClear && showClear) && (
        <button className="clear-btn" onClick={handleClear}>
          <img src={CrossInputSVG} alt="clear"/>
        </button>
      )}
    </div>
  )
}