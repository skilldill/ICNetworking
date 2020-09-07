import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

import "./style.scss";
import { TabbarItem } from "./components";
import { ROUTES } from "shared/constants";
import cn from "classnames";

// ICONS
import ColleguesSVG from "assets/icons/collegues.svg";
import MatchesSVG from "assets/icons/matches.svg";
import ChatsSVG from "assets/icons/chats.svg";
import MeetingsSVG from "assets/icons/meetings.svg";
import ProfileSVG from "assets/icons/profile.svg";

// ACTIVE ICONS
import ColleguesActiveSVG from "assets/icons/collegues-active.svg";
import MatchesActiveSVG from "assets/icons/matches-active.svg";
import ChatsActiveSVG from "assets/icons/chats-active.svg";
import MeetingsActiveSVG from "assets/icons/meetings-active.svg";
import ProfileActiveSVG from "assets/icons/profile-active.svg";

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