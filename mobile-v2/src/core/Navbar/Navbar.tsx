import React, { FC, useMemo, useEffect, CSSProperties } from "react";
import "./style.scss";

// ICONS
import { ArrowBackSVG, OptionsDotsSVG } from "assets/icons";

interface NavbarProps {
    title: string,
    options?: any,
    position?: "fixed" | "absolute" | "sticky",
    onClickBack?: () => void,
    onCancel?: () => void,
}

export const Navbar: FC<NavbarProps> = (props) => {
    const { title, options, onClickBack, onCancel, position } = props;

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

    const style = useMemo(():CSSProperties => ({
        position: !!position ? position : "fixed",
        top: "0px"
    }), [position])

    return (
        <div className="navbar" style={style}>
            {btnBack}
            <h3>{title}</h3>
            {btnCancel}
        </div>
    )
}