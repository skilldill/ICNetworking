import React, { useMemo } from "react";

import "./style.scss";
import { ProfileAvatarSVG } from "assets/icons";

interface AvatarFieldProps {
  photo: any | null,
  name: string,
  secondname: string,
  position: string,
  experience: number // На самом деле должен быть date
}

export const AvatarField = (props: AvatarFieldProps) => {
  const { photo, name, secondname, position, experience } = props;

  const avatar = useMemo(() => !!photo ? 
    <img src={photo} alt={`${name} ${secondname}`} /> :
    <div className="mock-photo"><img src={ProfileAvatarSVG} alt={`${name} ${secondname}`} /></div>
  , [photo])

  return (
    <div className="avatar-field-info">
      <div className="photo">
        {avatar}
      </div>
      <div className="info">
        <h3>{`${secondname} ${name}`}</h3>
        <small>{position}</small>
        <small>{`Стаж: ${experience} года`}</small>
      </div>
    </div>
  )
}