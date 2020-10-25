import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { PlusWhiteSVG } from "assets/icons";
import { matchesModule } from "store/matches";

export const MatchesAdd: FC = (props) => {
    const { selectMode } = useSelector(matchesModule.selector);
    const dispatch = useDispatch();

    const handleChangeSelectMode = useCallback(() => {
        dispatch(matchesModule.actions.setSelectMode(!selectMode));
    }, [selectMode])

    return (
        <div className="matches-add">
            <div className="add-members">
                <div className="circle-add" onClick={handleChangeSelectMode}>
                    <img src={PlusWhiteSVG} alt="Добавить"/>
                </div>
                <p>Пригласить</p>
            </div>
        </div>
    )
}