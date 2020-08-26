import React, { FC, useMemo } from "react";

import "./style.scss";

// ICONS
import ArrowBackSVG from "assets/icons/arrow-back.svg";
import OptionsDotsSVG from "assets/icons/options-dots.svg";

interface NavbarProps {
    title: string,
    options?: any,
    onClickBack?: () => void,
    onCancel?: () => void
}

export const Navbar: FC<NavbarProps> = (props) => {
    const { title, options, onClickBack, onCancel } = props;

    const btnBack = useMemo(() => {
        return !!onClickBack ? (
            <button className="back" onClick={onClickBack}>
                <img src={ArrowBackSVG} alt="назад"/>
            </button>
        ) : <div></div>
    }, [onClickBack])

    const btnCancel = useMemo(() => {
        return !!onCancel ? (
            <button className="cancel" onClick={onCancel}>
                Отмена
            </button>
        ) : <div></div>
    }, [onCancel]);

    return (
        <div className="navbar">
            {btnBack}
            <h3>{title}</h3>
            {btnCancel}
        </div>
    )
}