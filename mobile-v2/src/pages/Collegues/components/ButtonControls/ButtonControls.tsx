import React, { FC, useCallback } from "react";
import "./style.scss";

// ICONS
import { CrossSVG, SmileSVG } from "assets/icons";

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