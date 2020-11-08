import React, { FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";

import "./style.scss";
import { Button } from "shared/components";
import { matchesModule } from "store/matches";

interface ButtonMeetingProps {
    onClick: () => void;
}

export const ButtonMeeting: FC<ButtonMeetingProps> = (props) => {
    const { onClick } = props;

    const { selectedIds } = useSelector(matchesModule.selector);
    const dispatch = useDispatch();

    const classes = useMemo(() => cn({
        "button-meeting-background": true,
        "button-meeting-background-show": !!selectedIds.length
    }), [selectedIds])

    const handleClick = useCallback(() => {
        onClick();
    }, []);

    return (
        <div className={classes}>
            <div className="blur-background"></div>
            <Button onClick={handleClick}>Пригласить</Button>
        </div>
    )
}