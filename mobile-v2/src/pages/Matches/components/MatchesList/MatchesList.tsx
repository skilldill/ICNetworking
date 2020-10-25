import React, { FC, useMemo } from "react";

import "./style.scss";
import { Scrollable } from "core/Scrollable";
import { MacthesItem } from "../MatchesItem";

interface MatchesListProps {
    matches: any[],
    selectedIds: any[],
    selectMode: boolean
}

export const MatchesList: FC<MatchesListProps> = (props) => {
    const { matches, selectedIds, selectMode } = props;

    const matchesList = useMemo(() => matches.length ? (
        matches.map((match, i) => (
            <MacthesItem 
                key={i} 
                match={match} 
                selected={selectedIds.includes(match.id)}
                selectMode={selectMode}
            />
        ))
    ) : <></>, [matches, selectMode])

    return (
        <Scrollable className="matches-list">
            {matchesList}
        </Scrollable>
    )
}