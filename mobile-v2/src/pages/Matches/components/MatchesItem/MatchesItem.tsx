import React, {FC, useMemo} from "react";
import cn from "classnames";

import "./style.scss";
import Item from "antd/lib/list/Item";
import { PartBlock } from "shared/components";
import { ProfileAvatarSVG, SelectListItemActiveSVG, SelectListItemSVG } from "assets/icons";

interface MacthesItemProps {
    match: any,
    selected: boolean,
    selectMode: boolean
}

export const MacthesItem: FC<MacthesItemProps> = (props) => {
    const { match, selected, selectMode } = props;
    const { firstName, lastName, positionName, avatars } = match;

    const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);
    const position = useMemo(() => !!positionName ? positionName : 'Не указано', [positionName]);

    const avatar = useMemo(() => (!!avatars && avatars.length) ? (
        <div className="avatar">
            <img src={avatars[avatars.length - 1].picture} alt={firstName} />
        </div>
    ) : (
        <div className="avatar avatar-mock">
            <img src={ProfileAvatarSVG} alt={fullName} />
        </div>
    ), [avatars, fullName])
    
    const classes = useMemo(() => cn({
        "matches-item": true,
        "matches-item-select-mode": selectMode,
        "matches-item-selected": selectMode && selected,
    }), [selectMode, selected]);

    const selectIconSvg = useMemo(() => selected ? SelectListItemActiveSVG : SelectListItemSVG, [selected]);

    return (
        <PartBlock className={classes}>
            <div className="matches-item-select">
                <img src={selectIconSvg} alt="выбор"/>
            </div>
            <div className="matches-item-content">
                {avatar}
                <div>
                    <p className="fullname">{fullName}</p>
                    <p className="position">{position}</p>
                </div>
            </div>
        </PartBlock>
    )
}