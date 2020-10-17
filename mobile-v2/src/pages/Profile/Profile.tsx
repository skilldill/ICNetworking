import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { FadePage } from "core/FadePage";
import { ProfileForm } from "pages/ProfileForm";

// PARTS
import { AvatarField } from "./components";
import { Button } from "antd";
import { Scrollable } from "core/Scrollable";
import { ROUTES, StorageKeys } from "shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { profileModule } from "store/profile";
import { Loading } from "shared/components";
import { Page } from "core/Page";
import { useKeyboard } from "shared/hooks";
import { CommonProfilePart } from "core/CommonProfilePart";
import { commonModule } from "store/common";

export const Profile = () => {
    // STORAGE DATA
    const profileId = localStorage.getItem(StorageKeys.profileId);
    const userId = localStorage.getItem(StorageKeys.userId);

    const dispatch = useDispatch();
    const { profile } = useSelector(profileModule.selector);
    const [openKeyboard, hideKeyboard] = useKeyboard();

    const [showProfileForm, setShowProfileForm] = useState(false);

    const { edit } = useParams<{ edit: string }>();
    const history = useHistory();

    const handleClick = async () => {
        setShowProfileForm(true);
    }
    
    const handleClose = () => {
        hideKeyboard(() => setShowProfileForm(false));
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

    useEffect(() => {
        if (edit === "edit") {
            dispatch(commonModule.actions.setShowTabbar(false));
            setShowProfileForm(true);
        }
    }, [edit])

    const handlLogout = async () => {
        dispatch(profileModule.actions.logout(() => {
            history.push(ROUTES.loadingPage);
        }));
    }

    return !!profile ? (
        <Page className="profile">
            <Navbar 
                title="Профиль" 
                rightButton={<span className="nav-button" onClick={handleClick}>Ред.</span>}
            />

            <Scrollable>
                <AvatarField {...profile} />
                <CommonProfilePart profile={profile} />

                {/* TEST BUTTON */}
                <div style={{marginTop: "40px", paddingBottom: "50px"}}>
                    <Button 
                        type="link" 
                        danger 
                        size="large"
                        onClick={handlLogout}    
                    >Выйти</Button>
                </div>
            </Scrollable>
            
            <FadePage show={showProfileForm} direction="vertical">
                <ProfileForm onClose={handleClose} />
            </FadePage>
        </Page>
    ) : <Loading />
}