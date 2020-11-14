import React, { FC, useCallback, useState } from "react";

import "./style.scss";
import { Page } from "core/Page";
import { Navbar } from "core/Navbar";
import { Input, PartBlock, Button } from "shared/components";
import { TimePicker } from "../TimePicker";
import { RemovebaleList } from "../RemovebaleList";
import { Scrollable } from "core/Scrollable";

interface FinishPageProps {
    onClose: () => void;
}

export const FinishPage: FC<FinishPageProps> = (props) => {
    const { onClose } = props;
    
    const [ meetingName, setMeetingName ] = useState<string>("");

    const handleChangeMeetingName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setMeetingName(value);
    }, [])

    const handleClearMeetingName = useCallback(() => { setMeetingName("") }, []);

    return (
        <Page className="finish-page">
            <Navbar 
                title="Назначить встречу"
                onClickBack={onClose} 
            />
            <Scrollable style={{ position: 'relative' }}>
                <PartBlock>
                    <p className="input-title">Тема встречи</p>
                    <Input 
                        placeholder="Введите" 
                        value={meetingName}
                        onChange={handleChangeMeetingName}
                        onClear={handleClearMeetingName}
                        showClear 
                    />
                </PartBlock>

                <TimePicker />
                
                <p className="members-title">Участники</p>
                <RemovebaleList />

                <PartBlock>
                    <Button>Назначить</Button>
                </PartBlock>
            </Scrollable>
        </Page>
    )
}