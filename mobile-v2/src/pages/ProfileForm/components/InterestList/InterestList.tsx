import React, { FC, useEffect, useMemo } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { SuggestList } from "shared/components";
import { useDispatch, useSelector } from "react-redux";
import { listsModule } from "store/lists";

interface InterestListProps {
    onClose: () => void
}

export const InterestList: FC<InterestListProps> = (props) => {
    const { onClose } = props;

    const dispatch = useDispatch();
    const { interests, loading } = useSelector(listsModule.selector);

    useEffect(() => {
        if (interests.length === 0) {
            dispatch(listsModule.actions.fetchPositions());
        }
    }, [interests])

    const cancelButton = useMemo(() => (
        <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
    ), [onClose])

    return (
        <div className="interest-list">
            <Navbar 
                title="Интересы" 
                leftButton={cancelButton}
            />
            <SuggestList options={interests} />
        </div>
    )
}