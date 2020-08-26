import React, { FC } from "react";
import "./style.scss";

// PICTURES
import UserAltPNG from "assets/pictures/user-alt.png";

interface CollegueAvatarProps {
    collegues: any[];
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
}

export const CollegueAvatar: FC<CollegueAvatarProps> = (props) => {
    return (
        <div className="avatar-control">
            <div className="avatar avatar-next"></div>
            <div className="avatar">
                <div className="mock">
                    <img src={UserAltPNG} alt=""/>
                </div>
            </div>
        </div>
    )
}