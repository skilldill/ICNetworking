import { Navbar } from "core/Navbar";
import { Page } from "core/Page";
import React, { FC, useCallback, useMemo, useState } from "react";
import { Calendar, Button, PartBlock } from "shared/components";
import moment from "moment";

import "./style.scss";
import { FinishPage, Participants } from "./components";
import { DATE_FORMAT } from "shared/constants";
import { Scrollable } from "core/Scrollable";
import { FadePage } from "core/FadePage";

interface CreateMeetingsProps {
    onClose: () => void;
}

export const CreateMeetings: FC<CreateMeetingsProps> = (props) => {
    const { onClose } = props;
    
    const [showFinishPage, setShowFinishPage] = useState(true);

    const handleChangeDate = useCallback((date: any) => {
        console.log(moment(date).format(DATE_FORMAT));
    }, [])

    return (
        <Page>
            <Navbar 
                title="Назначить встречу"
                onClickBack={onClose}
            />
            <Scrollable>
                <Participants />
                <Calendar onChange={handleChangeDate} />

                <PartBlock>
                    <Button onClick={() => setShowFinishPage(true)}>Далее</Button>
                </PartBlock>
            </Scrollable>

            <FadePage show={showFinishPage} direction="horizontal">
                <FinishPage onClose={() => setShowFinishPage(false)} />
            </FadePage>
        </Page>
    )
}