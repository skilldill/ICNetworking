import React, { FC, useCallback } from "react";
import "./style.scss";

// ICONS
import CrossSVG from "assets/icons/cross.svg";
import SmileSVG from "assets/icons/smile.svg";

interface ButtonControlsProps {
    onLike: () => void;
    onSkip: () => void;
    isBlur?: boolean;
}

export const ButtonControls: FC<ButtonControlsProps> = (props) => {
    const { onLike, onSkip, isBlur } = props;

    return (
        <div className="btns-controls">
            <button className="btn btn-skip" onClick={onSkip}>
                <img src={CrossSVG} alt="пропустить"/>
            </button>

            <button className="btn btn-like" onClick={onLike}>
                <img src={SmileSVG} alt="выбрать"/>
            </button>
        </div>
    )
}