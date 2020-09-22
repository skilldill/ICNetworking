import React, { CSSProperties, FC, useMemo } from "react";
import cn from "classnames";
import "./style.scss";

export const Scrollable: FC<{ style?: CSSProperties }> = (props) => {
    const { style } = props;
    const { children } = props;

    return (
        <div className="scrollabel" style={style}>
            { children }
        </div>
    )
}  