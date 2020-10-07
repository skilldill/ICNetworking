import React, { useMemo } from "react";

import "./style.scss";
import { ProfileAvatarSVG } from "assets/icons";

interface AvatarFieldProps {
  gallery: any[] | null,
  user_data: any
}

export const AvatarField = (props: AvatarFieldProps) => {
  const { user_data, gallery } = props;
  const { first_name, last_name, email } = user_data;
  const photo = useMemo(() => (!!gallery && !!gallery.length) ? gallery[gallery.length - 1] : null, [gallery]);

  const avatar = useMemo(() => !!photo ? 
    <img src={photo.picture} alt={`${first_name} ${last_name}`} /> :
    <div className="mock-photo"><img src={ProfileAvatarSVG} alt={`${first_name} ${last_name}`} /></div>
  , [photo])

  return (
    <div className="avatar-field-info">
      <div className="photo">
        {avatar}
      </div>
      <div className="info">
        <h3>{`${first_name} ${last_name}`}</h3>
        <small>{email}</small>
      </div>
    </div>
  )
}