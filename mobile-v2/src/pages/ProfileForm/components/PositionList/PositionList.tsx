import React, { FC, useMemo } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";

interface PositionListProps {
    onClose: () => void
}

export const PositionList: FC<PositionListProps> = (props) => {
    const { onClose } = props;

    const cancelButton = useMemo(() => (
        <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
    ), [onClose])

    return (
        <div className="position-list">
            <Navbar 
                title="Должность" 
                leftButton={cancelButton}
            />
        </div>
    )
}