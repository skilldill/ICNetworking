import { ClockSVG } from "assets/icons";
import React, { FC, useCallback, useState } from "react";
import { PartBlock } from "shared/components";

import "./style.scss";

interface TimePickerProps {
    onChangeStartTime?: (startTime: string) => void;
    onChangeEndTime?: (endTime: string) =>  void;
}

export const TimePicker: FC<TimePickerProps> = (props) => {
    const { onChangeStartTime, onChangeEndTime } = props;

    const [startTime, setStartTime] = useState("11:00");
    const [endTime, setEndTime] = useState("12:00");

    const handleChangeStartTime = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const time = event.currentTarget.value;

        setStartTime(time);
        !!onChangeStartTime && onChangeStartTime(time);
    }, [onChangeStartTime])

    const handleChangeEndTime = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const time = event.currentTarget.value;

        setEndTime(time);
        !!onChangeEndTime && onChangeEndTime(time);
    }, [onChangeEndTime])
    
    return (
        <div className="time-picker">
            <PartBlock className="clock">
                <div className="clock-placeholder">
                    <img src={ClockSVG} alt="Начало встречи"/>
                    <span>Начало встречи</span>
                </div>
                <input type="time" value={startTime} onChange={handleChangeStartTime} />
            </PartBlock>
            <PartBlock className="clock">
                <div className="clock-placeholder">
                    <img src={ClockSVG} alt="Окончание встречи"/>
                    <span>Окончание встречи</span>
                </div>
                <input type="time" value={endTime} onChange={handleChangeEndTime} />
            </PartBlock>
        </div>
    )
}