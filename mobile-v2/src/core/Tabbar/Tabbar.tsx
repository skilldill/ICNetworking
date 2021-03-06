import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import cn from "classnames";
import { useSelector } from "react-redux";

import "./style.scss";
import { TabbarItem } from "./components";
import { ROUTES } from "shared/constants";
import { commonModule } from "store/common";

import {
    // ICONS
    ColleguesSVG,
    MatchesSVG,
    ChatsSVG,
    MeetingsSVG,
    ProfileSVG,

    // ACTIVE ICONS
    ColleguesActiveSVG,
    MatchesActiveSVG,
    ChatsActiveSVG,
    MeetingsActiveSVG,
    ProfileActiveSVG
} from "assets/icons";

export const Tabbar = () => {
    const [activeTab, setActiveTab] = useState(ROUTES.collegues);
    const { withBrow } = useSelector(commonModule.selector);

    const location = useLocation();

    const isAuthorization = useMemo(() => location.pathname === ROUTES.authorization, [location.pathname]);
    const isLoadingPage = useMemo(() => location.pathname === ROUTES.loadingPage, [location.pathname]);
    const isInitialForm = useMemo(() => location.pathname === ROUTES.profileEdit, [location.pathname])

    const classes = useMemo(() => cn({
        "tabbar": true,
        "tabbar-hide": isAuthorization || isLoadingPage || isInitialForm,
        "tabbar-without-bottom": withBrow
    }), [isAuthorization, isLoadingPage, isInitialForm, withBrow])

    return (
        <div className={classes}>
            <TabbarItem 
                to={ROUTES.collegues} 
                name="Коллеги" 
                icon={ColleguesSVG}
                iconActive={ColleguesActiveSVG}
                isActive={activeTab === ROUTES.collegues} 
                onClick={setActiveTab}
            />

            <TabbarItem 
                to={ROUTES.matches} 
                name="Совпадения" 
                icon={MatchesSVG}
                iconActive={MatchesActiveSVG}
                isActive={activeTab === ROUTES.matches} 
                onClick={setActiveTab}
            />

            <TabbarItem 
                to={ROUTES.chats} 
                name="Сообщения" 
                icon={ChatsSVG}
                iconActive={ChatsActiveSVG}
                isActive={activeTab === ROUTES.chats} 
                onClick={setActiveTab}
            />

            <TabbarItem 
                to={ROUTES.meetings} 
                name="Встречи" 
                icon={MeetingsSVG}
                iconActive={MeetingsActiveSVG}
                isActive={activeTab === ROUTES.meetings} 
                onClick={setActiveTab}
            />

            <TabbarItem 
                to={ROUTES.profileDefault} 
                name="Профиль" 
                icon={ProfileSVG}
                iconActive={ProfileActiveSVG}
                isActive={activeTab === ROUTES.profileDefault} 
                onClick={setActiveTab}
            />
        </div>
    )
}