import React, { FC } from "react";

import "./style.scss";
import { ArrowDownSVG } from "assets/icons";
import { PartBlock } from "shared/components";

// IMAGES
import AchievmentMeetingsPNG from "assets/pictures/achievment-meetings.png";
import AchievmentCalendarPNG from "assets/pictures/achievment-calendar.png"

interface AchievementsFieldProps {
  profile: any
}

export const AchievementsField: FC<AchievementsFieldProps> = (props) => {
  const { profile } = props;

  return (
    <PartBlock 
      className="achievements-field" 
      title={(
        <h3>
          Мои достижения 
          <img src={ArrowDownSVG} alt="открыть" />
        </h3>)}
    >
      <div className="achievments">
        
        <div className="achievment-card">
          <div className="picture">
            <img src={AchievmentMeetingsPNG} alt="Состоявшиеся встречи"/>
          </div>
          <h4>Состоявшиеся встречи</h4>
          <p>Название уровня</p>
        </div>

        <div className="achievment-card">
          <div className="picture">
            <img src={AchievmentCalendarPNG} alt="Запланированные встречи"/>
          </div>
          <h4>Запланированные встречи</h4>
          <p>Название уровня</p>
        </div>

      </div>
    </PartBlock>
  )
}