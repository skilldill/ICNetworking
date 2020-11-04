import React, { useEffect } from "react";
import "./style.scss";
import { Navbar } from "core/Navbar";
import { http } from "shared/http";
import { useDispatch, useSelector } from "react-redux";
import { matchesModule } from "store/matches";
import { Page } from "core/Page";
import { ButtonMeeting, MatchesAdd, MatchesList, MatchesSearch } from "./components";

export const Matches = () => {
    const dispatch = useDispatch();
    const { matches, loading, selectedIds, selectMode } = useSelector(matchesModule.selector);

    // test matches
    useEffect(() => {
        dispatch(matchesModule.actions.fetchMatches());
    },[])

    return (
        <Page className="matches">
            <Navbar title="Совпадения" />
            <MatchesAdd />
            <MatchesSearch />
            <MatchesList matches={matches} selectedIds={selectedIds} selectMode={selectMode} />
            <ButtonMeeting />
        </Page>
    )
}