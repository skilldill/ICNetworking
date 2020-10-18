import React, { FC } from "react";

import "./style.scss";
import { PlusSVG } from "assets/icons";
import { Scrollable } from "core/Scrollable";
import { PartBlock } from "..";

interface SelectListProps {
    options: any[],
    onSelect: (value: any) => void;
}

export const SelectList: FC<SelectListProps> = (props) => {
    const { options, onSelect } = props;

    return (
        <div className="select-list">
            <Scrollable>
                {!!options.length ? (
                    options.map((item: any, i: number) => ( 
                        <PartBlock key={i}>
                            <button className="btn-plus-circle" onClick={() => onSelect(item)}>
                                <img src={PlusSVG} alt="Добавить" />
                            </button>
                            <span>{item.name}</span>
                        </PartBlock>
                    ))) : (
                        <div />
                    )}
            </Scrollable>
        </div>
    )
}