import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { Scrollable } from "core/Scrollable";
import { Page } from "core/Page";
import { Navbar } from "core/Navbar";
import { Input, PartBlock } from "shared/components";
import { FilterTypes } from "./components";
import { FilterTypeNames } from "shared/constants";
import { colleguesModule } from "store/collegues";

interface FiltersBlockProps {
    onClose: () => void
}

export const FiltersBlock: FC<FiltersBlockProps> = (props) => {
    const { onClose } = props;
    const dispatch = useDispatch();

    const { filter } = useSelector(colleguesModule.selector);

    const handleChangeFilter = useCallback((filterType: FilterTypeNames) => {
        dispatch(colleguesModule.actions.setFilter({ type: filterType }));
    }, [dispatch])

    return (
        <Page className="filters-block">
            <Navbar 
                title="Коллеги" 
                leftButton={<span onClick={onClose}>Отмена</span>}
            />
            <Scrollable>
                <PartBlock className="search-block">
                    <Input search placeholder="Поиск"/>
                </PartBlock>
                <FilterTypes
                    activeFilterType={filter.type}
                    onChange={handleChangeFilter} 
                />
            </Scrollable>
        </Page>
        
    )
}