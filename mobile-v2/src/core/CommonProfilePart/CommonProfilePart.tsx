import React, { FC } from "react";
import { AchievementsField, CommonInfo, InterestsField } from "./components";

interface CommonProfilePartProps {
  profile: any
}

export const CommonProfilePart: FC<CommonProfilePartProps> = (props) => {
  const { profile } = props;
  
  return (
    <>
      <CommonInfo profile={profile} />
      <InterestsField profile={profile} />
      <AchievementsField />
    </>
  )
}