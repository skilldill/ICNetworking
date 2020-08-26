import React from "react";
import "./style.scss";
import { Navbar } from "core/Navbar";

export const Collegues = () => {
    return (
        <div className="collegues">
            <Navbar 
                title="Коллеги" 
                onClickBack={() => {}}
                onCancel={() => {}}
            />
        </div>
    )
}