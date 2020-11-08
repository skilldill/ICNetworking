import { Navbar } from "core/Navbar";
import { Page } from "core/Page";
import React, { FC, useMemo } from "react";

import "./style.scss";

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
        </Page>
    )
}