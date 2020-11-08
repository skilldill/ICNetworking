import React, { FC } from "react"
import BaseCalendar from "react-calendar";

import "./style.scss";
import { CalendarSVG, ArrowLeftSVG, ArrowRightSVG } from "assets/icons";

export const Calendar: FC = (props) => {
    return (
        <div className="calendar-events">
            <BaseCalendar 
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
            />
        </div>
    )
}