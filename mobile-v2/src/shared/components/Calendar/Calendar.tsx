import React, { FC } from "react"
import BaseCalendar from "react-calendar";

import "./style.scss";

export const Calendar: FC = (props) => {
    return (
        <div className="calendar-events">
            <BaseCalendar />
        </div>
    )
}