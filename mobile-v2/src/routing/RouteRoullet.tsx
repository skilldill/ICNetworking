import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { ROUTES } from "shared/constants";
import { Collegues, Matches, Chats, Meetings, Profile } from "pages";
import { Tabbar } from "core/Tabbar";

export const RouteRoullet = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Redirect to={ROUTES.collegues} />
                </Route>

                <Route path={ROUTES.collegues} exact>
                    <Collegues />
                </Route>

                <Route path={ROUTES.matches} exact>
                    <Matches />
                </Route>

                <Route path={ROUTES.chats} exact>
                    <Chats />
                </Route>

                <Route path={ROUTES.meetings} exact>
                    <Meetings />
                </Route>

                <Route path={ROUTES.profile} exact>
                    <Profile />
                </Route>
            </Switch>
            <Tabbar />
        </Router>
    )
}