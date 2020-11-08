import React, { FC } from "react"
import BaseCalendar from "react-calendar";
import moment from "moment";

import "./style.scss";
import { CalendarSVG, ArrowLeftSVG, ArrowRightSVG } from "assets/icons";

interface CalendarProps {
    onChange: (date: any) => void
}

export const Calendar: FC<CalendarProps> = (props) => {
    const { onChange } = props;
    
    return (
        <div className="calendar-events">
            <BaseCalendar 
                defaultValue={new Date(moment.now())}
                navigationLabel={(navProps) => (
                    <div className="calendar-header">
                        <img src={CalendarSVG} alt="календарь"/>
                        {navProps.label}
                    </div>
                )}
                prevLabel={
                    <div>
                        <img src={ArrowLeftSVG} alt="прошлый месяц" />
                    </div>
                }
                nextLabel={
                    <div>
                        <img src={ArrowRightSVG} alt="следующий месяц" />
                    </div>
                }

                onClickDay={onChange}
            />
        </div>
    )
}