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
                rightButton={<button><img src={OptionsDotsSVG} alt="options"/></button>}
            />
            <Button onClick={handleClick}>Открыть форму</Button>
            <FadePage show={showProfileForm} direction="vertical">
                <ProfileForm onClose={handleClick} />
            </FadePage>
        </div>
    )
}