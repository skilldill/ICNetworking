import React, { FC } from "react";

import "./style.scss";
import { Scrollable } from "core/Scrollable";
import { Page } from "core/Page";
import { Navbar } from "core/Navbar";

interface FiltersBlockProps {
    onClose: () => void
}

export const FiltersBlock: FC<FiltersBlockProps> = (props) => {
    const { onClose } = props;

    return (
        <Page className="filters-block">
            <Navbar 
                title="Коллеги" 
                leftButton={<span onClick={onClose}>Отмена</span>}
            />
            <Scrollable>
                
            </Scrollable>
        </Page>
        
    )
}