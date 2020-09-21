import React, { useState, useEffect } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { FadePage } from "core/FadePage";
import { ProfileForm } from "pages/ProfileForm";
import { OptionsDotsSVG } from "assets/icons";

// PARTS
import { AchievementsField, AvatarField, InterestsField } from "./components";
import { Button } from "antd";
import { Scrollable } from "core/Scrollable";

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
        <div className="profile" style={{ overflow: "scroll" }}>
            <Navbar 
                title="Профиль" 
                rightButton={
                    <button onClick={handleClick}>
                        <img src={OptionsDotsSVG} alt="options"/>
                    </button>
                }
            />

            <Scrollable>
                <AvatarField {...avatarData} />
                <InterestsField interests={interests} />
                <AchievementsField />


                {/* TEST BUTTON */}
                <div style={{marginTop: "40px", paddingBottom: "100px"}}>
                    <Button type="link" danger size="large">Выйти</Button>
                </div>
            </Scrollable>
            
            <FadePage show={showProfileForm} direction="vertical">
                <ProfileForm onClose={handleClick} />
            </FadePage>
        </div>
    )
}