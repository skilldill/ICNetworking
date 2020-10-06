import React, { CSSProperties, FC, useMemo } from "react";
import cn from "classnames";

import "./style.scss";
import { useSelector } from "react-redux";
import { keyboardModule } from "store/keyboard";

export const Scrollable: FC<{ style?: CSSProperties }> = (props) => {
    const { style } = props;
    const { children } = props;

    const { showKeyboard } = useSelector(keyboardModule.selector);

    const classes = useMemo(() => cn({
        "scrollabel": true,
        "scrollabel-with-keyboard": showKeyboard
    }), [showKeyboard])

    return (
        <div className={classes} style={style}>
            { children }
        </div>
    )
}  