import React, { useEffect, useState } from "react";
import "./style.scss";
import { Navbar } from "core/Navbar";
import { http } from "shared/http";
import { useDispatch, useSelector } from "react-redux";
import { matchesModule } from "store/matches";
import { Page } from "core/Page";
import { ButtonMeeting, MatchesAdd, MatchesList, MatchesSearch } from "./components";
import { FadePage } from "core/FadePage";
import { CreateMeetings } from "pages/CreateMeetings";

export const Matches = () => {
    const [showCreateMeetings, setShowCreateMeetings] = useState(true);

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
            <ButtonMeeting onClick={() => setShowCreateMeetings(true)}/>

            <FadePage show={showCreateMeetings} direction="horizontal">
                <CreateMeetings onClose={() => setShowCreateMeetings(false)} />
            </FadePage>
        </Page>
    )
}