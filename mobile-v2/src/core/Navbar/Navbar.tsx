import React, { FC, useMemo, CSSProperties, useEffect } from "react";
import "./style.scss";

// ICONS
import { ArrowBackSVG } from "assets/icons";
import { useSelector } from "react-redux";
import { commonModule } from "store/common";

interface NavbarProps {
    title: string,
    position?: "fixed" | "absolute" | "sticky",
    onClickBack?: () => void,
    onCancel?: () => void,
    leftButton?: JSX.Element
    rightButton?: JSX.Element
}

export const Navbar: FC<NavbarProps> = (props) => {
    const { title, onClickBack, onCancel, position, leftButton, rightButton } = props;
    const { withBrow } = useSelector(commonModule.selector);

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

    const currentLeftButton = useMemo(() => !!leftButton ? <div className="back">{leftButton}</div> : btnBack, [leftButton]);
    const currentRightButton = useMemo(() => !!rightButton ? <div className="cancel">{rightButton}</div> : btnCancel, [rightButton]);

    const style = useMemo((): CSSProperties => ({
        position: !!position ? position : "fixed",
        top: "0px"
    }), [position])

    const styleWithBrow = useMemo((): CSSProperties => withBrow ? 
        { ...style, paddingTop: "60px" } :
        style, 
    [withBrow, style])

    return (
        <div className="navbar" style={styleWithBrow}>
            {currentLeftButton}
            <h3>{title}</h3>
            {currentRightButton}
        </div>
    )
}