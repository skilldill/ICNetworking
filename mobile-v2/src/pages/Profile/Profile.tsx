import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { FadePage } from "core/FadePage";
import { ProfileForm } from "pages/ProfileForm";
import { OptionsDotsSVG } from "assets/icons";

// PARTS
import { AchievementsField, AvatarField, InterestsField } from "./components";
import { Button } from "antd";
import { Scrollable } from "core/Scrollable";
import { ROUTES, StorageKeys } from "shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { profileModule } from "store/profile";
import { Loading } from "shared/components";
import { Page } from "core/Page";

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
    // STORAGE DATA
    const profileId = localStorage.getItem(StorageKeys.profileId);
    const userId = localStorage.getItem(StorageKeys.userId);

    const dispatch = useDispatch();
    const { profile } = useSelector(profileModule.selector);

    const [showProfileForm, setShowProfileForm] = useState(false);

    const { edit } = useParams<{ edit: string }>();
    const history = useHistory();

    const handleClick = () => {
        setShowProfileForm(!showProfileForm);
    }
    
    // SET INITIAL VALUE FORMS
    useEffect(() => {
        // CHECK WHICH ID WE HAVE
        dispatch(profileModule.actions.setProfileId(profileId));
        dispatch(profileModule.actions.setUserId(userId));

        if (!!profileId) {
            dispatch(profileModule.actions.fetchProfile(parseInt(profileId!)));
        } else {
            dispatch(profileModule.actions.fetchUser(parseInt(userId!)));
        }
    }, [])

    const handlLogout = async () => {
        dispatch(profileModule.actions.logout(() => {
            history.push(ROUTES.loadingPage);
        }));
    }

    return !!profile ? (
        <Page className="profile">
            <Navbar 
                title="Профиль" 
                rightButton={
                    <button onClick={handleClick}>
                        <img src={OptionsDotsSVG} alt="options"/>
                    </button>
                }
            />

            <Scrollable>
                <AvatarField {...profile} />
                <InterestsField interests={interests} />
                <AchievementsField />


                {/* TEST BUTTON */}
                <div style={{marginTop: "40px", paddingBottom: "100px"}}>
                    <Button 
                        type="link" 
                        danger 
                        size="large"
                        onClick={handlLogout}    
                    >Выйти</Button>
                </div>
            </Scrollable>
            
            <FadePage show={showProfileForm} direction="vertical">
                <ProfileForm onClose={handleClick} />
            </FadePage>
        </Page>
    ) : <Loading />
}