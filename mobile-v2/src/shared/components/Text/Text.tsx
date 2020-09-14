import React, { FC } from "react";
import { Input } from "antd";
import { TextAreaProps } from "antd/lib/input";

import "./style.scss";

export const Text: FC<TextAreaProps & { label?: string }> = (props) => {
    const { label } = props;
    const { TextArea } = Input;

    return (
        <div className="control-textarea">
            {!!label && <small>{label}</small>}
            <TextArea {...props} />
            <div className="hide-resize"></div>
        </div>
    )
}