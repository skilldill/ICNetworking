import { Navbar } from "core/Navbar";
import { Page } from "core/Page";
import React, { FC, useMemo } from "react";
import { Calendar } from "shared/components";

import "./style.scss";
import { Participants } from "./components";

interface CreateMeetingsProps {
    onClose: () => void;
}

export const CreateMeetings: FC<CreateMeetingsProps> = (props) => {
    const { onClose } = props;
    
    return (
        <Page>
            <Navbar 
                title="Назначить встречу"
                onClickBack={onClose}
            />
            <Participants />
            <Calendar />
        </Page>
    )
}