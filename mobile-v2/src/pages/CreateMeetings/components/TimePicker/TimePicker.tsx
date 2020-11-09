import { ClockSVG } from "assets/icons";
import React, { FC, useCallback } from "react";
import { PartBlock } from "shared/components";

import "./style.scss";

interface TimePickerProps {
    onChangeStartTime?: (startTime: string) => void;
    onChangeEndTime?: (endTime: string) =>  void;
}

export const TimePicker: FC<TimePickerProps> = (props) => {
    const { onChangeStartTime, onChangeEndTime } = props;

    const handleChangeStartTime = useCallback((time: string) => {
        !!onChangeStartTime && onChangeStartTime(time);
    }, [onChangeStartTime])

    const handleChangeEndTime = useCallback((time: string) => {
        !!onChangeEndTime && onChangeEndTime(time);
    }, [onChangeEndTime])
    
    return (
        <div className="time-picker">
            <PartBlock className="clock">
                <div className="clock-placeholder">
                    <img src={ClockSVG} alt="Начало встречи"/>
                    <span>Начало встречи</span>
                </div>
                <input type="time" value="11:00"/>
            </PartBlock>
            <PartBlock className="clock">
                <div className="clock-placeholder">
                    <img src={ClockSVG} alt="Окончание встречи"/>
                    <span>Окончание встречи</span>
                </div>
                <input type="time" value="12:00"/>
            </PartBlock>
        </div>
    )
}