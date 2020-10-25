import React, { FC, useEffect, useMemo } from "react"
import { useSelector } from "react-redux";
import cn from "classnames";

import "./style.scss";
import { commonModule } from "store/common";

interface PageProps {
    className?: string
}

export const Page: FC<PageProps> = (props) => {
    const { children, className } = props;

    const { showKeyboard, withBrow } = useSelector(commonModule.selector);

    const classes = useMemo(() => {
        if (!!className) {
            return cn({
                "page": true,
                "page-with-brow": withBrow,
                "page-without-bottom-padding": showKeyboard,
            }, [className])
        }

        return cn({
            "page": true,
            "page-with-brow": withBrow,
            "page-without-bottom-padding": showKeyboard,
        })
    }, [showKeyboard, className, withBrow])

    return <div className={classes}>{children}</div>
}