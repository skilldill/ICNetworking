import React, { FC, useEffect, useState, useMemo, useCallback } from "react";
import cn from "classnames";

import "./style.scss";
import { MAX_TOUCH_TRANSLATE } from "shared/constants";

interface CollegueModalProps {
    collegue: any;
    onOpen: () => void;
    onClose: () => void;
    doClose: boolean
}

export const CollegueModal: FC<CollegueModalProps> = (props) => {
    const { collegue, onOpen, onClose, doClose } = props;

    // FOR ANIMATION COLLEGUE CHANGE
    const [currentCollegue, setCurrentCollegue] = useState<any>(null);
    const [hideInfo, setHideInfo] = useState(false);

    // FOR DRAGABLE EFFECT
    const [startY, setStartY] = useState(0);
    const [translate, setTranslate] = useState(400);
    const [transition, setTransition] = useState(false);

    const [modeShowInfo, setModeShowInfo] = useState(false);

    const addTransitionAnimation = useCallback(() => {
        const promiseAnimation = new Promise<NodeJS.Timeout>((resolve) => {
            setTransition(true);
            setTranslate(400);

            const timeout = setTimeout(() => {
                resolve(timeout);
            }, 400);
        })

        promiseAnimation
            .then((timeout) => {
                clearTimeout(timeout);
                setTransition(false);
            })
    }, [setTransition]);
    
    const handleTouchStart = (event: React.TouchEvent) => {
        setStartY(event.touches[0].clientY);
    }

    const handleTouchMove = (event: React.TouchEvent) => {
        const currentX = event.touches[0].clientY;
        const diff = currentX - startY;
        setTranslate(400 + diff);
    }

    const handleTouchEnd = () => {
        if (Math.abs(translate - 400) > (MAX_TOUCH_TRANSLATE)) {

            // DRAG TO DOWN
            if (translate > 400) {
                 // ADD TRANSITION FOR ANIMATION
                addTransitionAnimation();
            }

            // DRAG TO UP
            if (translate < 400) {
                const dragPromise = new Promise<NodeJS.Timeout>((resolve) => {
                    setTransition(true);
                    setModeShowInfo(true);
                    onOpen();

                    const timeout = setTimeout(() => {
                        resolve(timeout);
                    }, 400);
                })

                dragPromise
                    .then(() => {
                        setTransition(false);
                    })
            }

            return;
        }

        // ADD TRANSITION FOR ANIMATION
        addTransitionAnimation();
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

    // OUTSIDE CLOSE MODAL
    useEffect(() => {
        if (!doClose) {
            const closePromise = new Promise<NodeJS.Timeout>((resolve) => {
                setTransition(true);
                setModeShowInfo(false);
                setTranslate(400);

                const timeout = setTimeout(() => {
                    resolve(timeout);
                }, 400);
            })

            closePromise
                .then((timeout) => {
                    clearTimeout(timeout);
                    setTransition(false);
                })
        }
    }, [doClose])

    const topInfoClasses = useMemo(() => cn({
        'top-info': true,
        'top-info-hide': hideInfo
    }), [hideInfo]);

    const modalClasses = useMemo(() => cn({
        'modal-control': true,
        'modal-control-show-info': modeShowInfo
    }), [modeShowInfo])

    const dragStyle: React.CSSProperties = useMemo(() => ({
        transform: `translateY(${translate}px)`,
        transition : transition ? "all .3s" : "none",
    }), [translate, transition]);

    return (
        <div className={modalClasses}
            style={dragStyle}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="top">
                <div></div>
            </div>
            <div className="collegue-info">
                {!!currentCollegue && (
                    <div className={topInfoClasses}>
                        <h3 className="name">{currentCollegue.name}</h3>
                        <span className="position">{currentCollegue.position}</span>
                    </div>
                )}
            </div>
        </div>
    )
}