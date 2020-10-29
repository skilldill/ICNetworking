import React, { FC, useCallback, useMemo } from "react";

import "./style.scss";
import { Scrollable } from "core/Scrollable";
import { MacthesItem } from "../MatchesItem";
import { useDispatch } from "react-redux";
import { matchesModule } from "store/matches";

interface MatchesListProps {
    matches: any[],
    selectedIds: any[],
    selectMode: boolean
}

export const MatchesList: FC<MatchesListProps> = (props) => {
    const { matches, selectedIds, selectMode } = props;

    const dispatch = useDispatch();

    const hanleSelect = useCallback((id) => {
        console.log(id);
        dispatch(matchesModule.actions.selectMatchId(id));
    }, [dispatch]);

    const matchesList = useMemo(() => matches.length ? (
        matches.map((match, i) => (
            <MacthesItem 
                key={i} 
                match={match} 
                selected={selectedIds.includes(match.id)}
                selectMode={selectMode}
                onSelectMatch={hanleSelect}
            />
        ))
    ) : <></>, [matches, selectMode, selectedIds])

    return (
        <Scrollable className="matches-list">
            {matchesList}
        </Scrollable>
    )
}