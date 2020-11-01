import React, { FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { PlusWhiteSVG, ProfileAvatarSVG, SmallCrossWhiteSVG } from "assets/icons";
import { matchesModule } from "store/matches";

export const MatchesAdd: FC = (props) => {
    const { selectMode, selectedIds, matches } = useSelector(matchesModule.selector);
    const dispatch = useDispatch();

    const handleChangeSelectMode = useCallback(() => {
        dispatch(matchesModule.actions.setSelectMode(!selectMode));
    }, [selectMode])

    const handleRemoveMember = useCallback((member: any) => {
        const { id } = member;
        dispatch(matchesModule.actions.selectMatchId(id));
    }, [dispatch]);
    
    const selectedCollegues = useMemo(() => matches.filter((match) => selectedIds.includes(match.id)), [selectedIds, matches]);
    const members = useMemo(() => !!selectedCollegues && (
        <div className="members">
            {selectedCollegues.map((member, i) => 
                <div className="member" key={i}>
                    <div className="btn-remove" onClick={() => handleRemoveMember(member)}>
                        <img src={SmallCrossWhiteSVG} alt="remove"/>
                    </div>
                    <div className="circle" onClick={handleChangeSelectMode}>
                        {!!member.avatars.length ? (
                            <img className="avatar" src={member.avatars[member.avatars.length - 1].picture} alt={member.name} />
                        ): (
                            <img className="avatar-mock" src={ProfileAvatarSVG} alt={member.name} />
                        )}
                    </div>
                    <p>{member.firstName}</p>
                </div>
            )}
        </div>
    ), [selectedCollegues])

    return (
        <div className="matches-add">
            <div className="add-members">
                <div className="circle-add" onClick={handleChangeSelectMode}>
                    <img src={PlusWhiteSVG} alt="Добавить" />
                </div>
                <p>Пригласить</p>
            </div>
            {members}
        </div>
    )
}