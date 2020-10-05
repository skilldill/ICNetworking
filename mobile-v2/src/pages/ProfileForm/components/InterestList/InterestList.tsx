import React, { FC, useEffect, useMemo, useState } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { SuggestList } from "shared/components";
import { useDispatch, useSelector } from "react-redux";
import { listsModule } from "store/lists";

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

    useEffect(() => {
        if (interests.length === 0 && !requested) {
            dispatch(listsModule.actions.fetchInterests());
        }
    }, [interests, requested])

    const cancelButton = useMemo(() => (
        <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
    ), [onClose])

    return (
        <div className="interest-list">
            <Navbar 
                title="Интересы" 
                leftButton={cancelButton}
            />
            <SuggestList options={interests} onSelect={onSelect} />
        </div>
    )
}