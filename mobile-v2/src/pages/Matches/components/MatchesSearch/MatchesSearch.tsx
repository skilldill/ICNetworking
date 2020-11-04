import React from "react";

import "./style.scss";
import { Input, PartBlock } from "shared/components";

export const MatchesSearch = () => {
    return (
        <PartBlock className="matches-search">
            <Input search />
        </PartBlock>
    )
}