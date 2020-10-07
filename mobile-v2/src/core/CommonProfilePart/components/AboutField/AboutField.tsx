import React, { FC } from "react";

import "./style.scss";
import { PartBlock } from "shared/components";

interface AboutFieldProps {
  profile: any
}

export const AboutField: FC<AboutFieldProps> = (props) => {
  const { profile } = props;
  const { bio } = profile;

  return (
    <PartBlock title="Информация о себе" className="about">
      <p>{bio}</p>
    </PartBlock>
  )
}