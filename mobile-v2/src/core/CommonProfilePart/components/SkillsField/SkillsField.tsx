import React, { FC } from "react";

import "./style.scss";
import { ArrowDownSVG, StarFill } from "assets/icons";
import { PartBlock } from "shared/components";

interface SkillsFieldProps {
  profile: any
}

export const SkillsField: FC<SkillsFieldProps> = (props) => {
  const { profile } = props;

  return (
    <PartBlock 
      className="skills-field"
      title={(
        <h3>
          Мои достижения 
          <img src={ArrowDownSVG} alt="открыть" />
        </h3>)}
    >
      <div className="skills">
        <div className="row">
          <div className="skill">
            <div className="top">
              <h4>Excel</h4>
              <img src={StarFill} alt="рейтинг"/>
            </div>
            <p>Оценили: 1220</p>
          </div>

          <div className="skill">
            <div className="top">
              <h4>Word</h4>
              <img src={StarFill} alt="рейтинг"/>
            </div>
            <p>Оценили: 100</p>
          </div>
        </div>

        <div className="row">
          <div className="skill">
            <div className="top">
              <h4>PowerPoint</h4>
              <img src={StarFill} alt="рейтинг"/>
            </div>
            <p>Оценили: 50</p>
          </div>

          <div className="skill">
            <div className="top">
              <h4>Менеджмент</h4>
              <img src={StarFill} alt="рейтинг"/>
            </div>
            <p>Оценили: 0</p>
          </div>
        </div>
      </div>
    </PartBlock>
  )
}