import React, { FC, useMemo } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";

interface SkillsListProps {
  onClose: () => void
}

export const SkillsList: FC<SkillsListProps> = (props) => {
  const { onClose } = props;

  const cancelButton = useMemo(() => (
      <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
  ), [onClose])

  return (
    <div className="skills-list">
      <Navbar 
          title="Навыки" 
          leftButton={cancelButton}
      />
    </div>
  )
}