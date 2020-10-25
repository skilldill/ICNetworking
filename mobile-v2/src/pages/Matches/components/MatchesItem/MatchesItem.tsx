import Item from "antd/lib/list/Item";
import React, {FC, useMemo} from "react";
import { PartBlock } from "shared/components";

import "./style.scss";
import { ProfileAvatarSVG } from "assets/icons";

interface MacthesItemProps {
    match: any,
    onLongPress?: () => void
}

export const MacthesItem: FC<MacthesItemProps> = (props) => {
    const { match, onLongPress } = props;
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

    return (
        <PartBlock className="matches-item">
            {avatar}
            <div>
                <p className="fullname">{fullName}</p>
                <p className="position">{position}</p>
            </div>
        </PartBlock>
    )
}