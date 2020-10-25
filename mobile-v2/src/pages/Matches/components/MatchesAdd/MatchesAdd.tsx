import { PlusWhiteSVG } from "assets/icons";
import React, { FC } from "react";

import "./style.scss";

export const MatchesAdd: FC = (props) => {
    return (
        <div className="matches-add">
            <div className="add-members">
                <div className="circle-add">
                    <img src={PlusWhiteSVG} alt="Добавить"/>
                </div>
                <p>Пригласить</p>
            </div>
        </div>
    )
}