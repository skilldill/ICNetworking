import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { SuggestList } from "shared/components";
import { useDispatch, useSelector } from "react-redux";
import { listsModule } from "store/lists";
import { Page } from "core/Page";
import { DELAY_KEYBOARD } from "shared/constants";
import { useKeyboard } from "shared/hooks";

interface PositionListProps {
    onClose: () => void,
    onSelect: (value: any) => void;
}

export const PositionList: FC<PositionListProps> = (props) => {
    const { onClose, onSelect } = props;

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

    useEffect(() => {
        if (positions.length === 0 && !requested) {
            dispatch(listsModule.actions.fetchPositions());
        }
    }, [positions, requested])

    const handleClose = useCallback(async () => {
        // Этот костыль нужен чтобы сначала убрать 
        // клавиатуру, а потом закрыть окно, 
        // тогда в мобилке не останется следа от клавиатуры
        // на форме
    
        setFocusedSearch(false);
        await hideKeyboard();
        onClose();
      }, [onClose])

    const cancelButton = useMemo(() => (
        <span onClick={handleClose} className="nav-button nav-button-cancel">Отмена</span>
    ), [onClose])
    
    const handleSelect = useCallback((value: any) => {
        onSelect(value);
        handleClose();
    }, [onSelect, handleClose])

    return (
        <Page>
            <Navbar 
                title="Должность" 
                leftButton={cancelButton}
            />
            <SuggestList options={positions} onSelect={handleSelect} focused={focusedSearch} />
        </Page>
    )
}