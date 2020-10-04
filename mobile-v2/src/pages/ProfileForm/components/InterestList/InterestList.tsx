import React, { FC, useMemo } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";

interface InterestListProps {
    onClose: () => void
}

export const InterestList: FC<InterestListProps> = (props) => {
    const { onClose } = props;

    const cancelButton = useMemo(() => (
        <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
    ), [onClose])

    return (
        <div className="interest-list">
            <Navbar 
                title="Интересы" 
                leftButton={cancelButton}
            />
        </div>
    )
}