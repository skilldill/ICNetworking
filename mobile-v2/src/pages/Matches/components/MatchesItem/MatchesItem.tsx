import Item from "antd/lib/list/Item";
import React, {FC} from "react";
import { PartBlock } from "shared/components";

import "./style.scss";

interface MacthesItemProps {
    match: any,
    onLongPress?: () => void
}

export const MacthesItem: FC<MacthesItemProps> = (props) => {
    const { match, onLongPress } = props;

    return (
        <PartBlock className="matches-item">
            
        </PartBlock>
    )
}