import React, { useState, useEffect } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { FadePage } from "core/FadePage";
import { ProfileForm } from "pages/ProfileForm";
import { Button } from "shared/components";
import { OptionsDotsSVG } from "assets/icons";

export const Profile = () => {
    const [showProfileForm, setShowProfileForm] = useState(false);

    const handleClick = () => {
        setShowProfileForm(!showProfileForm);
    }

    return (
        <div className="profile">
            <Navbar 
                title="Профиль" 
                rightButton={
                    <button onClick={handleClick}>
                        <img src={OptionsDotsSVG} alt="options"/>
                    </button>
                }
            />
            <FadePage show={showProfileForm} direction="vertical">
                <ProfileForm onClose={handleClick} />
            </FadePage>
        </div>
    )
}