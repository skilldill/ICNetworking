import React, { CSSProperties, FC, useMemo } from "react";
import cn from "classnames";

import "./style.scss";
import { useSelector } from "react-redux";
import { commonModule } from "store/common";

interface ScrollableProps {
    className?: string,
    style?: CSSProperties
}

export const Scrollable: FC<ScrollableProps> = (props) => {
    const { style, className } = props;
    const { children } = props;

    const { showKeyboard, showTabbar, withBrow } = useSelector(commonModule.selector);

    const classes = useMemo(() => cn({
        "scrollabel": true,
        "scrollabel-with-brow": withBrow,
        "scrollabel-with-keyboard": showKeyboard || !showTabbar,
        "scrollabel-with-brow-keyboard": withBrow && showKeyboard
    }, className), [showKeyboard, showTabbar, className, withBrow])

    return (
        <div className={classes} style={style}>
            { children }
        </div>
    )
}  