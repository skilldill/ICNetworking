import React, { FC } from "react";

import "./style.scss";
import { 
  AchievementMeetingsHeldSVG,
  AchievementMeetingsSheduledSVG,
  AchievementMeetingsAppointmentsSVG,
} from "assets/icons";

interface AchievementsFieldProps {
  achievements?: { name: string, rate: number }[]
}

export const AchievementsField: FC<AchievementsFieldProps> = (props) => {
  const { achievements } = props;

  return (
    <div className="achievements-field">
      <h3>Мои достижения</h3>
      <div className="achievements-content">

        <div className="achievement">
          <div className="picture">
            <img src={AchievementMeetingsHeldSVG} alt="held meetings"/>
          </div>
          <div className="description">
            <h4>Состоявшиеся встречи</h4>
            <small>Название уровня</small>
          </div>
        </div>

        <div className="achievement">
          <div className="picture">
            <img src={AchievementMeetingsSheduledSVG} alt="held meetings"/>
          </div>
          <div className="description">
            <h4>Запланированные встречи</h4>
            <small>Название уровня</small>
          </div>
        </div>

        <div className="achievement">
          <div className="picture">
            <img src={AchievementMeetingsAppointmentsSVG} alt="held meetings"/>
          </div>
          <div className="description">
            <h4>Назначенные встречи</h4>
            <small>Название уровня</small>
          </div>
        </div>

        <div className="achievement">
          <div className="picture">
            <img src={AchievementMeetingsAppointmentsSVG} alt="held meetings"/>
          </div>
          <div className="description">
            <h4>Успешные встречи</h4>
            <small>Название уровня</small>
          </div>
        </div>

      </div>
    </div>
  )
}