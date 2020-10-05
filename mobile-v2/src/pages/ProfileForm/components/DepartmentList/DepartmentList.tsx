import { Navbar } from "core/Navbar";
import React, { FC, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SuggestList } from "shared/components";
import { listsModule } from "store/lists";

interface DepartmentListProps {
  onClose: () =>  void;
}

export const DepartmentList: FC<DepartmentListProps> = (props) => {
  const { onClose } = props;

  const dispatch = useDispatch();
  const { departments, loading } = useSelector(listsModule.selector);

  useEffect(() => {
      if (departments.length === 0) {
          dispatch(listsModule.actions.fetchPositions());
      }
  }, [departments])

  const cancelButton = useMemo(() => (
      <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
  ), [onClose])

  return (
    <div className="department-list">
      <Navbar 
          title="Отдел" 
          leftButton={cancelButton}
      />
      <SuggestList options={[]} />
    </div>
  )
}