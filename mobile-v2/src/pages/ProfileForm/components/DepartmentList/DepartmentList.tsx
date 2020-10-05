import { Navbar } from "core/Navbar";
import React, { FC, useMemo } from "react";

interface DepartmentListProps {
  onClose: () =>  void;
}

export const DepartmentList: FC<DepartmentListProps> = (props) => {
  const { onClose } = props;

  const cancelButton = useMemo(() => (
      <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
  ), [onClose])

  return (
    <div className="department-list">
      <Navbar 
          title="Отдел" 
          leftButton={cancelButton}
      />
    </div>
  )
}