import { BasketSVG } from "assets/icons";
import React, { FC } from "react";

import "./style.scss";

interface RemovebaleItemProps {
    member: any,
    onRemove: (id: any) => void
}

export const RemovebaleItem: FC<RemovebaleItemProps> = (props) => {
    const { member, onRemove } = props;

    return (
        <div className="removebale-item">
            <div className="remove">
                <img src={BasketSVG} alt="Удалить" />
                <p>Удалить</p>
            </div>
        </div>
    )
}