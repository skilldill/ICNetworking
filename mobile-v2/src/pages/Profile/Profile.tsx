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
        
        if (showProfileForm) {
            document.body.style.overflowY = "auto";
            return;
        }
        
        document.body.style.overflowY = "hidden";
        window.scrollTo(0, 0);
        
        return () => {
            document.body.style.overflowY = "hidden";
            window.scrollTo(0, 0);
        }
        
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