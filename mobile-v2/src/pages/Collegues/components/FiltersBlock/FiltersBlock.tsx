import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { Scrollable } from "core/Scrollable";
import { Page } from "core/Page";
import { Navbar } from "core/Navbar";
import { Input, PartBlock, SelectList } from "shared/components";
import { FilterTypes } from "./components";
import { FilterTypeNames } from "shared/constants";
import { colleguesModule } from "store/collegues";
import { listsModule } from "store/lists";

interface FiltersBlockProps {
    onClose: () => void
}

export const FiltersBlock: FC<FiltersBlockProps> = (props) => {
    const { onClose } = props;
    const dispatch = useDispatch();

    const { filter } = useSelector(colleguesModule.selector);
    const { departments, interests, positions } = useSelector(listsModule.selector);
    const [options, setOptions] = useState<any>([]);

    // Очищаеи все листы перед поиском
    useEffect(() => {
        dispatch(listsModule.actions.setDepartments([]));
        dispatch(listsModule.actions.setInterests([]));
        dispatch(listsModule.actions.setPositions([]));
    }, [])

    useEffect(() => {
        switch(filter.type) {
            case FilterTypeNames.interest:
                setOptions(interests);
                break;

            case FilterTypeNames.department:
                setOptions(departments);
                break;

            case FilterTypeNames.position:
                setOptions(positions);
                break;

            default:
                setOptions([]);
                break;
        }
    }, [filter.type, interests, departments, positions])

    const handleSearch = useMemo(() => {
        switch(filter.type) {
            case FilterTypeNames.interest:
                return (event: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = event.currentTarget;
                    dispatch(listsModule.actions.searchInterests(value, true))
                };
                
            case FilterTypeNames.department:
                return (event: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = event.currentTarget;
                    dispatch(listsModule.actions.searchDepartments(value, true))
                };

            case FilterTypeNames.position:
                return (event: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = event.currentTarget;
                    dispatch(listsModule.actions.searchPositions(value, true))
                };
        }
    }, [filter.type])

    const handleChangeFilter = useCallback((filterType: FilterTypeNames) => {
        dispatch(colleguesModule.actions.setFilter({ type: filterType }));
    }, [dispatch])

    const handleSelect = useCallback((value: any) => {
        console.log(value);
    }, []);

    return (
        <Page className="filters-block">
            <Navbar 
                title="Коллеги" 
                leftButton={<span onClick={onClose}>Отмена</span>}
            />
            <PartBlock className="search-block">
                <Input search placeholder="Поиск" onChange={handleSearch}/>
            </PartBlock>
            <FilterTypes
                activeFilterType={filter.type}
                onChange={handleChangeFilter} 
            />
            <SelectList options={options} onSelect={handleSelect} />
        </Page>
        
    )
}