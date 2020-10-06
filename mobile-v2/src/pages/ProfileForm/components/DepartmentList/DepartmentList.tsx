import { Navbar } from "core/Navbar";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { SuggestList } from "shared/components";
import { listsModule } from "store/lists";
import { Page } from "core/Page";

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

  // FOR TRANSITION FOCUS SEARCH INPUT
  const [focusedSearch, setFocusedSearch] = useState(false);

  useEffect(() => {
      const timout = setTimeout(() => {
          setFocusedSearch(true);
          clearTimeout(timout);
      }, 350)
  }, [])

  useEffect(() => {
      if (departments.length === 0 && !requested) {
          setRequested(true);
          dispatch(listsModule.actions.fetchDepartments());
      }
  }, [departments, requested])

  const handleClose = useCallback(() => {
    // Этот костыль нужен чтобы сначала убрать 
    // клавиатуру, а потом закрыть окно, 
    // тогда в мобилке не останется следа от клавиатуры
    // на форме

    setFocusedSearch(false);

    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      onClose();
    }, 100)
  }, [onClose])

  const handleSelect = useCallback((value: any) => {
    onSelect(value);
    handleClose();
  }, [onSelect, handleClose])

  const cancelButton = useMemo(() => (
      <span onClick={handleClose} className="nav-button nav-button-cancel">Отмена</span>
  ), [onClose])

  return (
    <Page>
      <Navbar 
          title="Отдел" 
          leftButton={cancelButton}
      />
      <SuggestList options={departments} onSelect={handleSelect} focused={focusedSearch} />
    </Page>
  )
}