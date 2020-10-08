import React, { CSSProperties, FC, useMemo } from "react";
import cn from "classnames";

import "./style.scss";
import { useSelector } from "react-redux";
import { keyboardModule } from "store/keyboard";

interface ScrollableProps {
    className?: string,
    style?: CSSProperties
}

export const Scrollable: FC<ScrollableProps> = (props) => {
    const { style, className } = props;
    const { children } = props;

    const { showKeyboard } = useSelector(keyboardModule.selector);

    const classes = useMemo(() => cn({
        "scrollabel": true,
        "scrollabel-with-keyboard": showKeyboard
    }, className), [showKeyboard, className])

    return (
        <div className={classes} style={style}>
            { children }
        </div>
    )
}  