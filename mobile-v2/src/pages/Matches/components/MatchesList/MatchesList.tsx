import React, { FC, useMemo } from "react";

import "./style.scss";
import { Scrollable } from "core/Scrollable";
import { MacthesItem } from "../MatchesItem";

interface MatchesListProps {
    matches: any[]
}

export const MatchesList: FC<MatchesListProps> = (props) => {
    const { matches } = props;

    const matchesList = useMemo(() => matches.length ? (
        matches.map((match, i) => <MacthesItem key={i} match={match} />)
    ) : <></>, [matches])

    return (
        <Scrollable className="matches-list">
            {matchesList}
        </Scrollable>
    )
}