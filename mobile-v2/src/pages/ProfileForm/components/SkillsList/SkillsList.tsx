import React, { FC, useMemo } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { SuggestList } from "shared/components";
import { Scrollable } from "core/Scrollable";

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
      <Scrollable>
        <SuggestList options={[]} />
      </Scrollable>
    </div>
  )
}