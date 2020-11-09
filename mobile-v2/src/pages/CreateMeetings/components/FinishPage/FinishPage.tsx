import React, { FC } from "react";
import { Page } from "core/Page";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { Input, PartBlock } from "shared/components";
import { TimePicker } from "../TimePicker";

interface FinishPageProps {
    onClose: () => void;
}

export const FinishPage: FC<FinishPageProps> = (props) => {
    const { onClose } = props;

    return (
        <Page className="finish-page">
            <Navbar 
                title="Назначить встречу"
                onClickBack={onClose} 
            />
            <PartBlock>
                <p className="input-title">Тема встречи</p>
                <Input placeholder="Введите" onClear={() => {}} showClear />
            </PartBlock>

            <TimePicker />
        </Page>
    )
}