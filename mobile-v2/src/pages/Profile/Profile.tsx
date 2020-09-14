import React, { useState, useEffect } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { FadePage } from "core/FadePage";
import { ProfileForm } from "pages/ProfileForm";
import { OptionsDotsSVG } from "assets/icons";

// PARTS
import { AvatarField, InterestsField } from "./components";

const MOCK_USER = {
    name: "Сергей",
    secondname: "Валашович",
    photo: null,
    position: "Руководитель отдела разработки",
    experience: 3,
    interests: [
        {name: 'Футбол'},
        {name: 'Бизнес-литература'},
        {name: 'Теннис'},
        {name: 'Дизайн'},
        {name: 'Искусство'},
        {name: 'Работа'}
    ]
}

const { interests, ...avatarData } = MOCK_USER;

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

            <AvatarField {...avatarData} />
            <InterestsField interests={interests} />

            <FadePage show={showProfileForm} direction="vertical">
                <ProfileForm onClose={handleClick} />
            </FadePage>
        </div>
    )
}