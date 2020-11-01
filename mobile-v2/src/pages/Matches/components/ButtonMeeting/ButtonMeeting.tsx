import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";

import "./style.scss";
import { Button } from "shared/components";
import { matchesModule } from "store/matches";

export const ButtonMeeting = () => {
    const { selectedIds } = useSelector(matchesModule.selector);
    const dispatch = useDispatch();

    const classes = useMemo(() => cn({
        "button-meeting-background": true,
        "button-meeting-background-show": !!selectedIds.length
    }), [selectedIds])

    const handleClick = useCallback(() => {

    }, []);

    return (
        <div className={classes}>
            <div className="blur-background"></div>
            <Button onClick={handleClick}>Пригласить</Button>
        </div>
    )
}