import { BasketSVG, ProfileAvatarSVG } from "assets/icons";
import React, { FC, useEffect, useMemo } from "react";
import { useTouch } from "shared/hooks";

import "./style.scss";

interface RemovebaleItemProps {
    member: any,
    onRemove: (id: any) => void
}

export const RemovebaleItem: FC<RemovebaleItemProps> = (props) => {
    const { member, onRemove } = props;

    useEffect(() => {
        console.log(member);
    }, [])

    const {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        addTransitionAnimation,
        
        setStateTranslateX,
        setStateTranslateY,
        setStateTransition,

        stateStartX,
        stateStartY,
        stateTranslateX,
        stateTranslateY,
        stateTransition
    } = useTouch();

    const onTouchEnd = () => {
        console.log(stateTranslateX);

        if (Math.abs(stateTranslateX) > 50) {
            // ADD TRANSITION FOR ANIMATION
            addTransitionAnimation(undefined, -88);
        } else {
            addTransitionAnimation(undefined, 0);
        }
    }

    const dragStyle: React.CSSProperties = useMemo(() => ({
        transform: `translateX(${stateTranslateX}px)`,
        transition : stateTransition ? "all .3s" : "none"
    }), [stateTranslateX, stateTransition]);

    return (
        <div className="removebale-item">
            <div className="remove">
                <img src={BasketSVG} alt="Удалить" />
                <p>Удалить</p>
            </div>

            <div className="member-content"
                style={dragStyle}
                onTouchStart={handleTouchStart()}
                onTouchMove={handleTouchMove()}
                onTouchEnd={handleTouchEnd(onTouchEnd)}
            >
                <div className="circle">
                    {!!member.avatars.length ? (
                        <img className="avatar" src={member.avatars[member.avatars.length - 1].picture} alt={member.name} />
                    ): (
                        <img className="avatar-mock" src={ProfileAvatarSVG} alt={member.name} />
                    )}
                </div>
                <div className="member-info">
                    <p className="member-info-name">{`${member.firstName} ${member.lastName}`}</p>
                    <p className="member-info-position">{!!member.positionName ? member.positionName : "Не указано"}</p>
                </div>
            </div>
        </div>
    )
}