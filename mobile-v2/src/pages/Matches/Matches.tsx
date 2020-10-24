import React, { useEffect } from "react";
import "./style.scss";
import { Navbar } from "core/Navbar";
import { http } from "shared/http";

export const Matches = () => {

    // test matches
    useEffect(() => {
        const getMatches = async () => {
            try {
                await http.get('/api/events/matches/');
            } catch(error) {
                console.log(error.message);
            }
        }

        getMatches();
    },[])

    return (
        <div className="matches">
            <Navbar title="Совпадения" />
        </div>
    )
}