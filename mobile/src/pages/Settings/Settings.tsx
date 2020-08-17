import React, { useCallback } from "react";

import "./style.scss";
import { OnboardingSettings } from "./modules";
import { Page } from "shared/components"
import { SettingsBlock } from "./components";
import { useHistory } from "react-router";

export const Settings = () => {
    const history = useHistory();

    const goToProfileSettings = useCallback(() => {
        history.push('/profile-settings');
    }, [history])

    return (
        <Page>
            <div className="settings">
                <OnboardingSettings />
                
                <SettingsBlock title="Настройки профиля">
                    <button onClick={goToProfileSettings} className="btn">
                        Открыть настройки профиля
                    </button>
                </SettingsBlock>
            </div>
        </Page>
    )
}