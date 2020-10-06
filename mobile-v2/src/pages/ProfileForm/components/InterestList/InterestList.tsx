import React, { FC, useEffect, useMemo, useState } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { SuggestList } from "shared/components";
import { useDispatch, useSelector } from "react-redux";
import { listsModule } from "store/lists";
import { Page } from "core/Page";

interface InterestListProps {
    onClose: () => void;
    onSelect: (value: any) => void;
}

export const InterestList: FC<InterestListProps> = (props) => {
    const { onClose, onSelect } = props;

    const dispatch = useDispatch();
    const { interests, loading } = useSelector(listsModule.selector);

    // FOR CHECK ALREDY WAS QUERY
    const [requested, setRequested] = useState(false);

    // FOR TRANSITION FOCUS SEARCH INPUT
    const [focusedSearch, setFocusedSearch] = useState(false);

    useEffect(() => {
        const timout = setTimeout(() => {
            setFocusedSearch(true);
            clearTimeout(timout);
        }, 350)

        return () => setFocusedSearch(false);
    }, [])

    useEffect(() => {
        if (interests.length === 0 && !requested) {
            dispatch(listsModule.actions.fetchInterests());
        }
    }, [interests, requested])

    const cancelButton = useMemo(() => (
        <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
    ), [onClose])

    return (
        <Page>
            <Navbar 
                title="Интересы" 
                leftButton={cancelButton}
            />
            <SuggestList options={interests} onSelect={onSelect} focused={focusedSearch} />
        </Page>
    )
}