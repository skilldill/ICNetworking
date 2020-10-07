import React, { FC, useEffect, useMemo } from "react"
import { useSelector } from "react-redux";
import cn from "classnames";

import "./style.scss";
import { keyboardModule } from "store/keyboard";

interface PageProps {
    className?: string
}

export const Page: FC<PageProps> = (props) => {
    const { children, className } = props;

    const { showKeyboard } = useSelector(keyboardModule.selector);

    const classes = useMemo(() => {
        if (!!className) {
            return cn({
                "page": true,
                "page-without-bottom-padding": showKeyboard,
            }, [className])
        }

        return cn({
            "page": true,
            "page-without-bottom-padding": showKeyboard,
        })
    }, [showKeyboard, className])

    return <div className={classes}>{children}</div>
}