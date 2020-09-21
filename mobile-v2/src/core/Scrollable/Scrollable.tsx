import React, { FC, useMemo } from "react";
import cn from "classnames";
import "./style.scss";

export const Scrollable: FC<{ hideTabbar?: boolean }> = (props) => {
    const { hideTabbar } = props;
    const { children } = props;

    const classes = useMemo(() => cn({
        "scrollabel": true,
        "hide-tabbar": hideTabbar
    }), [hideTabbar])

    return (
        <div className={classes}>
            { children }
        </div>
    )
}  