import React from "react";
import { Button } from "antd";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

export const RouteRoullet = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <>
                        <h1>Hello custom capacitor</h1>
                        <Button size="large">CLICK</Button>
                    </>
                </Route>
                <Route path="/just" exact>
                    <h1>Hello just capacitor</h1>
                </Route>
            </Switch>
        </Router>
    )
}