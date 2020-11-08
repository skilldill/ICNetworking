import { Navbar } from "core/Navbar";
import { Page } from "core/Page";
import React, { FC, useCallback, useMemo } from "react";
import { Calendar } from "shared/components";
import moment from "moment";

import "./style.scss";
import { Participants } from "./components";
import { DATE_FORMAT } from "shared/constants";

interface CreateMeetingsProps {
    onClose: () => void;
}

export const CreateMeetings: FC<CreateMeetingsProps> = (props) => {
    const { onClose } = props;
    
    const handleChangeDate = useCallback((date: any) => {
        console.log(moment(date).format('DD-MM-YYYY'));
    }, [])

    return (
        <Page>
            <Navbar 
                title="Назначить встречу"
                onClickBack={onClose}
            />
            <Participants />
            <Calendar onChange={handleChangeDate} />
        </Page>
    )
}