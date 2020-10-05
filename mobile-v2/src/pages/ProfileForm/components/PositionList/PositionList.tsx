import React, { FC, useEffect, useMemo } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { SuggestList } from "shared/components";
import { useDispatch, useSelector } from "react-redux";
import { listsModule } from "store/lists";

interface PositionListProps {
    onClose: () => void
}

export const PositionList: FC<PositionListProps> = (props) => {
    const { onClose } = props;

    const dispatch = useDispatch();
    const { positions, loading } = useSelector(listsModule.selector);

    useEffect(() => {
        if (positions.length === 0) {
            dispatch(listsModule.actions.fetchPositions());
        }
    }, [positions])

    const cancelButton = useMemo(() => (
        <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
    ), [onClose])

    return (
        <div className="position-list">
            <Navbar 
                title="Должность" 
                leftButton={cancelButton}
            />
            <SuggestList options={[]} />
        </div>
    )
}