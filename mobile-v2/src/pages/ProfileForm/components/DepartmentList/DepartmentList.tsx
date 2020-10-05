import { Navbar } from "core/Navbar";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { SuggestList } from "shared/components";
import { listsModule } from "store/lists";

interface DepartmentListProps {
  onClose: () =>  void;
  onSelect: (value: any) => void;
}

export const DepartmentList: FC<DepartmentListProps> = (props) => {
  const { onClose, onSelect } = props;

  const dispatch = useDispatch();
  const { departments, loading } = useSelector(listsModule.selector);

  // FOR CHECK ALREDY WAS QUERY
  const [requested, setRequested] = useState(false);

  useEffect(() => {
      if (departments.length === 0 && !requested) {
          setRequested(true);
          dispatch(listsModule.actions.fetchDepartments());
      }
  }, [departments, requested])

  const cancelButton = useMemo(() => (
      <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
  ), [onClose])

  return (
    <div className="department-list">
      <Navbar 
          title="Отдел" 
          leftButton={cancelButton}
      />
      <SuggestList options={departments} onSelect={onSelect} />
    </div>
  )
}