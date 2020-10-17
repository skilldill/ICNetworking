import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { SuggestList } from "shared/components";
import { useDispatch, useSelector } from "react-redux";
import { listsModule } from "store/lists";
import { Page } from "core/Page";
import { DELAY_KEYBOARD } from "shared/constants";
import { useKeyboard } from "shared/hooks";
import { keyboardModule } from "store/keyboard";

interface PositionListProps {
    onClose: () => void,
    onSelect: (value: any) => void;
}

export const PositionList: FC<PositionListProps> = (props) => {
    const { onClose, onSelect } = props;

    const { showKeyboard } = useSelector(keyboardModule.selector);

    const dispatch = useDispatch();
    const { positions, loading } = useSelector(listsModule.selector);
    const [openKeyboard, hideKeyboard] = useKeyboard();

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

    const handleClose = () => {
        // Этот костыль нужен чтобы сначала убрать 
        // клавиатуру, а потом закрыть окно, 
        // тогда в мобилке не останется следа от клавиатуры
        // на форме
    
        setFocusedSearch(false);
        hideKeyboard(() => onClose());
      }

    const handleSelect = useCallback((value: any) => {
        // Если у объекта нет id значит это значение,
        // которое ввел пользователь
        if (!value.id) {
            dispatch(listsModule.actions.createPosition(value));
        } else {
            onSelect(value);
        }
        handleClose();
    }, [onSelect, handleClose])

    const handleSearch = useCallback((value: string) => {
        dispatch(listsModule.actions.searchPositions(value));
    }, [dispatch])

    return (
        <Page>
            <Navbar 
                title="Должность" 
                leftButton={<span onClick={handleClose} className="nav-button nav-button-cancel">Отмена</span>}
            />
            <SuggestList 
                options={positions} 
                onSelect={handleSelect} 
                focused={focusedSearch}
                onSearch={handleSearch}
            />
        </Page>
    )
}