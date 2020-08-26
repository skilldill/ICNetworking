import React from "react";
import "./style.scss";
import { Navbar } from "core/Navbar";

import { CollegueAvatar, CollegueModal, ButtonControls } from "./components";

export const Collegues = () => {
    return (
        <div className="collegues">
            <Navbar title="Коллеги" />

            <ButtonControls 
                onLike={() => {}}
                onSkip={() => {}}
            />

            <CollegueModal />
        </div>
    )
}