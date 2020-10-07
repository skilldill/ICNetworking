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

interface InterestListProps {
    onClose: () => void;
    onSelect: (value: any) => void;
}

export const InterestList: FC<InterestListProps> = (props) => {
    const { onClose, onSelect } = props;

    const { showKeyboard } = useSelector(keyboardModule.selector);

    const dispatch = useDispatch();
    const { interests, loading } = useSelector(listsModule.selector);
    const [openKeyboard, hideKeyboard] = useKeyboard();

    // FOR CHECK ALREDY WAS QUERY
    const [requested, setRequested] = useState(false);

    // FOR TRANSITION FOCUS SEARCH INPUT
    const [focusedSearch, setFocusedSearch] = useState(false);

    useEffect(() => {
        const timout = setTimeout(() => {
            setFocusedSearch(true);
            dispatch(keyboardModule.actions.setShowKeyboard(true));
            clearTimeout(timout);
        }, 350)
    }, [])

    useEffect(() => {
        if (interests.length === 0 && !requested) {
            dispatch(listsModule.actions.fetchInterests());
        }
    }, [interests, requested])

    const handleClose = () => {
        // Этот костыль нужен чтобы сначала убрать 
        // клавиатуру, а потом закрыть окно, 
        // тогда в мобилке не останется следа от клавиатуры
        // на форме
    
        setFocusedSearch(false);
        hideKeyboard(() => onClose());
    }
    
    const handleSelect = useCallback((value: any) => {
        onSelect(value);
        handleClose();
    }, [onSelect, handleClose])

    return (
        <Page>
            <Navbar 
                title="Интересы" 
                leftButton={<span onClick={handleClose} className="nav-button nav-button-cancel">Отмена</span>}
            />
            <SuggestList options={interests} onSelect={handleSelect} focused={focusedSearch} />
        </Page>
    )
}