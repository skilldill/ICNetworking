import React, { useState, useEffect } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { FadePage } from "core/FadePage";
import { ProfileForm } from "pages/ProfileForm";
import { Button } from "shared/components";

export const Profile = () => {
    const [showProfileForm, setShowProfileForm] = useState(false);

    const handleClick = () => {
        setShowProfileForm(!showProfileForm);
    }

    // ADD SCROLLING TO BODY
    useEffect(() => {
        document.body.style.overflowY = showProfileForm ? "auto" : "hidden";
    }, [showProfileForm]);

    return (
        <div className="profile">
            <Navbar title="Профиль" />
            <Button onClick={handleClick}>Открыть форму</Button>
            <FadePage show={showProfileForm} direction="vertical">
                <ProfileForm onClose={handleClick} />
            </FadePage>
        </div>
    )
}