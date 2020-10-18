import React, { FC, useCallback } from "react"

import "./style.scss";
import { FilterTypeNames } from "shared/constants";

interface FilterTypesProps {
    onChange: (filterType: FilterTypeNames) => void,
    activeFilterType: FilterTypeNames
}

export const FilterTypes: FC<FilterTypesProps> = (props) => {
    const { onChange, activeFilterType } = props;

    return (
        <div className="filter-types">
            <div className="type-value" onClick={() => onChange(FilterTypeNames.interest)}>
                <span>Интересы</span>
                {activeFilterType === FilterTypeNames.interest &&  <div className="outline"></div>}
            </div>
            <div className="type-value" onClick={() => onChange(FilterTypeNames.skills)}>
                <span>Навыки</span>
                {activeFilterType === FilterTypeNames.skills &&  <div className="outline"></div>}
            </div>
            <div className="type-value" onClick={() => onChange(FilterTypeNames.department)}>
                <span>Отдел</span>
                {activeFilterType === FilterTypeNames.department &&  <div className="outline"></div>}
            </div>
            <div className="type-value" onClick={() => onChange(FilterTypeNames.position)}>
                <span>Должность</span>
                {activeFilterType === FilterTypeNames.position &&  <div className="outline"></div>}
            </div>
        </div>
    )
}