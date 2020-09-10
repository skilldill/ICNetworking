import React, { useState } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { FadePage } from "core/FadePage";
import { ProfileForm } from "pages/ProfileForm";
import { Button } from "shared/components";

export const Profile = () => {
    const [showProfileForm, setShowProfileForm] = useState(true);

    const handleClick = () => {
        setShowProfileForm(true);
    }

    return (
        <div className="profile">
            <Navbar title="Профиль" />
            <Button onClick={handleClick}>Открыть форму</Button>
            <FadePage show={showProfileForm} direction="vertical">
                <ProfileForm />
            </FadePage>
        </div>
    )
}