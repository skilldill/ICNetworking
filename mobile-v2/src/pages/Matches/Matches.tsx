import React, { useEffect } from "react";
import "./style.scss";
import { Navbar } from "core/Navbar";
import { http } from "shared/http";
import { useDispatch, useSelector } from "react-redux";
import { matchesModule } from "store/matches";

export const Matches = () => {
    const dispatch = useDispatch();
    const { matches, loading } = useSelector(matchesModule.selector);

    // test matches
    useEffect(() => {
        dispatch(matchesModule.actions.fetchMatches());
    },[])

    return (
        <div className="matches">
            <Navbar title="Совпадения" />
        </div>
    )
}