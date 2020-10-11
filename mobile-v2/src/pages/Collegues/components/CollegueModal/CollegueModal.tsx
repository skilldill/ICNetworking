import React, { FC, useEffect, useState, useMemo, useCallback } from "react";
import cn from "classnames";

import "./style.scss";
import { MAX_TOUCH_TRANSLATE } from "shared/constants";
import { useTouch } from "shared/hooks";
import { CommonProfilePart } from "core/CommonProfilePart";

interface CollegueModalProps {
    collegue: any;
    onOpen: () => void;
    onClose: () => void;
    doClose: boolean
}

export const CollegueModal: FC<CollegueModalProps> = (props) => {
    const { collegue, onOpen, onClose, doClose } = props;

    // FOR DRAGGBLE EFFECT
    const { 
        stateTranslateY, 
        stateTransition,
        
        setStateTranslateY,
        setStateTransition,
        addTransitionAnimation,

        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    } = useTouch({ translateY: 400 })

    // FOR ANIMATION COLLEGUE CHANGE
    const [currentCollegue, setCurrentCollegue] = useState<any>(null);
    const [hideInfo, setHideInfo] = useState(false);

    // FOR CLOSE DRAGBLE
    const [startTouchNameY, setStartTouchNameY] = useState(0);
    const [transitionTouchName, setTransitionTouchName] = useState(0);

    const [modeShowInfo, setModeShowInfo] = useState(false);

    const onTouchEnd = () =>{
        if (Math.abs(stateTranslateY - 400) > (MAX_TOUCH_TRANSLATE)) {

            // DRAG TO DOWN
            if (stateTranslateY > 400) {
                 // ADD TRANSITION FOR ANIMATION
                addTransitionAnimation();
            }

            // DRAG TO UP
            if (stateTranslateY < 400) {
                const dragPromise = new Promise<NodeJS.Timeout>((resolve) => {
                    setStateTransition(true);
                    setModeShowInfo(true);
                    onOpen();

                    const timeout = setTimeout(() => {
                        resolve(timeout);
                    }, 400);
                })

                dragPromise
                    .then(() => {
                        setStateTransition(false);
                    })
            }

            return;
        }

        // ADD TRANSITION FOR ANIMATION
        addTransitionAnimation(undefined, 0, 400);
    }

    useEffect(() => {
        if (!currentCollegue) {
            setCurrentCollegue(collegue);
        } else {
            const hidePromise = new Promise<NodeJS.Timeout>((resolve) => {
                setHideInfo(true);

                const timeout = setTimeout(() => {
                    resolve(timeout);
                }, 300);
            })

            hidePromise
                .then((timeout) => {
                    clearTimeout(timeout);
                    setCurrentCollegue(collegue);
                    setHideInfo(false);
                })
        }
    }, [collegue]);

    const closeModal = useCallback(() => {
        const closePromise = new Promise<NodeJS.Timeout>((resolve) => {
            setStateTransition(true);
            setModeShowInfo(false);
            setStateTranslateY(400);
            onClose();
            const timeout = setTimeout(() => {
                resolve(timeout);
            }, 400);
        })

        closePromise
            .then((timeout) => {
                clearTimeout(timeout);
                setStateTransition(false);
            })
    }, [stateTransition, modeShowInfo, stateTranslateY])

    // OUTSIDE CLOSE MODAL
    useEffect(() => {
        if (!doClose) {
            closeModal();
        }
    }, [doClose])

    // FOR DRAGBLE CLOSE BINDING ONT NAME ELEMENT
    const handleStartTouchOnName = (event: React.TouchEvent) => {
        const y = event.touches[0].clientY;
        setStartTouchNameY(y);
    }

    const handleMoveTouchOnName = (event: React.TouchEvent) => {
        const y = event.touches[0].clientY;
        setTransitionTouchName(y - startTouchNameY);
    }

    const handleEndTouchOnName = () => {
        if (transitionTouchName >= MAX_TOUCH_TRANSLATE/2) {
            closeModal();
        }
    }

    const showProfileInfo = useMemo(() => !!collegue && modeShowInfo, [collegue, modeShowInfo]);

    const topInfoContent = useMemo(() => modeShowInfo ? (
            <p className="email">{!!currentCollegue && currentCollegue.email}</p>
        ) : (
            <>
                {(!!currentCollegue && !!currentCollegue.positionName) && <p>{currentCollegue.positionName}</p>}
                <p>Стаж: 2 года</p>
            </>
    ), [modeShowInfo, currentCollegue])

    const topInfoClasses = useMemo(() => cn({
        'top-info': true,
        'top-info-hide': hideInfo
    }), [hideInfo]);

    const modalClasses = useMemo(() => cn({
        'modal-control': true,
        'modal-control-show-info': modeShowInfo
    }), [modeShowInfo])

    const dragStyle: React.CSSProperties = useMemo(() => ({
        transform: `translateY(${stateTranslateY}px)`,
        transition : stateTransition ? "all .3s" : "none",
    }), [stateTranslateY, stateTransition]);

    return (
        <div 
            className={modalClasses}
            style={dragStyle}
            onTouchStart={!modeShowInfo ? handleTouchStart() : undefined}
            onTouchMove={!modeShowInfo ? handleTouchMove() : undefined}
            onTouchEnd={!modeShowInfo ? handleTouchEnd(onTouchEnd) : undefined}
        >
            <div className="top">
                <div></div>
            </div>
            <div 
                className="collegue-info"
                onTouchStart={modeShowInfo ? handleStartTouchOnName : undefined}
                onTouchMove={modeShowInfo ? handleMoveTouchOnName: undefined}
                onTouchEnd={modeShowInfo ? handleEndTouchOnName : undefined}
            >
                {!!currentCollegue && (
                    <div className={topInfoClasses}>
                        <h3 className="name">{`${currentCollegue.firstName} ${currentCollegue.lastName}`}</h3>
                        {topInfoContent}
                    </div>
                )}
            </div>
            {showProfileInfo && <CommonProfilePart profile={collegue.prevProfile} />}
        </div>
    )
}