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
        
        stateTranslateX,
        stateTransition
    } = useTouch();

    const onTouchEnd = () => {
        console.log(stateTranslateX);

        // Проверяем что листаем в левую сторону
        if (stateTranslateX < 0) {
            if (Math.abs(stateTranslateX) > 50) {
                // ADD TRANSITION FOR ANIMATION
                addTransitionAnimation(undefined, -88);
            } else {
                addTransitionAnimation(undefined, 0);
            }

            return;
        }

        setStateTranslateX(0);
    }

    const dragStyle: React.CSSProperties = useMemo(() => {
        if (stateTranslateX < 0) {
            return {
                transform: `translateX(${stateTranslateX}px)`,
                transition : stateTransition ? "all .3s" : "none"
            }
        }

        return {}
    }, [stateTranslateX, stateTransition]);

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