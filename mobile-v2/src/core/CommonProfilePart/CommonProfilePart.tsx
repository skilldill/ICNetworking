import React, { FC } from "react";
import { AboutField, AchievementsField, CommonInfo, InterestsField, SkillsField } from "./components";

interface CommonProfilePartProps {
  profile: any
}

export const CommonProfilePart: FC<CommonProfilePartProps> = (props) => {
  const { profile } = props;
  
  return (
    <>
      <CommonInfo profile={profile} />
      <InterestsField profile={profile} />
      <AchievementsField profile={profile} />
      <SkillsField profile={profile} />
      <AboutField profile={profile} />
    </>
  )
}