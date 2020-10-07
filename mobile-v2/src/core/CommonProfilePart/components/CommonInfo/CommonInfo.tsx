import React, { FC } from "react";
import { PartBlock } from "shared/components";

import "./style.scss";
import { DepartmentSVG, PositionSVG, LevelSVG } from "assets/icons";

interface CommonInfoProps {
  profile: any
}

export const CommonInfo: FC<CommonInfoProps> = (props) => {
  const { profile } = props;
  const { department_name, position_name } = profile;
  return (
    <PartBlock className="common-profile-info">
      <ul className="info">
        <li>
          <img src={DepartmentSVG} alt="отдел"/>
          <span>Отдел: </span>
          <span className="value">{department_name}</span>
        </li>
        <li>
          <img src={PositionSVG} alt="отдел" style={{ marginRight: 13 }} />
          <span>Должность: </span>
          <span className="value">{position_name}</span>
        </li>
        <li>
          <img src={LevelSVG} alt="отдел" style={{ marginRight: 9 }} />
          <span>Стаж работы в компании: </span>
          <span className="value">3 года</span>
        </li>
      </ul>
    </PartBlock>
  )
}