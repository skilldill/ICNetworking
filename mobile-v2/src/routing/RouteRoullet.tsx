import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Plugins } from "@capacitor/core";

import { ROUTES } from "shared/constants";
import { Collegues, Matches, Chats, Meetings, Profile, Authorization, LoadingPage } from "pages";
import { Tabbar } from "core/Tabbar";
import { useDispatch, useSelector } from "react-redux";
import { keyboardModule } from "store/keyboard";

export const RouteRoullet = () => {
    const { Keyboard } = Plugins;

    const dispatch = useDispatch();
    const { showKeyboard } = useSelector(keyboardModule.selector);

    useEffect(() => {
        Keyboard.addListener("keyboardWillShow", () => dispatch(keyboardModule.actions.setShowKeyboard(true)));
        Keyboard.addListener("keyboardWillHide", () =>  dispatch(keyboardModule.actions.setShowKeyboard(false)));
    }, [])

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Redirect to={ROUTES.loadingPage} />
                </Route>

                <Route path={ROUTES.loadingPage} exact>
                    <LoadingPage />
                </Route>

                <Route path={ROUTES.authorization} exact>
                    <Authorization />
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
            {!showKeyboard && <Tabbar />}
        </Router>
    )
}