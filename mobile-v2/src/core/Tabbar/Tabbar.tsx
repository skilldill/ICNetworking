import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import cn from "classnames";

import "./style.scss";
import { TabbarItem } from "./components";
import { ROUTES } from "shared/constants";

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

    const location = useLocation();
    const isAuthorization = useMemo(() => location.pathname === ROUTES.authorization, [location.pathname]);

    return (
        <div className={cn({ "tabbar": true, "tabbar-hide": isAuthorization })}>
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
                to={ROUTES.profile} 
                name="Профиль" 
                icon={ProfileSVG}
                iconActive={ProfileActiveSVG}
                isActive={activeTab === ROUTES.profile} 
                onClick={setActiveTab}
            />
        </div>
    )
}