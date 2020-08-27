import React, { FC, useEffect, useState, useMemo, useCallback } from "react";
import cn from "classnames";

import "./style.scss";
import { MAX_TOUCH_TRANSLATE } from "shared/constants";

interface CollegueModalProps {
    collegue: any;
}

export const CollegueModal: FC<CollegueModalProps> = (props) => {
    const { collegue } = props;

    // FOR ANIMATION COLLEGUE CHANGE
    const [currentCollegue, setCurrentCollegue] = useState<any>(null);
    const [hideInfo, setHideInfo] = useState(false);

    // FOR DRAGABLE EFFECT
    const [startY, setStartY] = useState(0);
    const [translate, setTranslate] = useState(400);
    const [transition, setTransition] = useState(false);

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

            // DRAG TO UP
            if (translate > 400) {

            }

            // DRAG TO DOWN
            if (translate < 400) {

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

    const topInfoClasses = useMemo(() => cn({
        'top-info': true,
        'top-info-hide': hideInfo
    }), [hideInfo]);

    const dragStyle: React.CSSProperties = useMemo(() => ({
        transform: `translateY(${translate}px)`,
        transition : transition ? "all .3s" : "none",
    }), [translate, transition]);

    return (
        <div className="modal-control"
            style={dragStyle}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="top">
                <div></div>
            </div>
            <div className="collegue-info">
                { !!currentCollegue && (
                    <div className={topInfoClasses}>
                        <h3 className="name">{currentCollegue.name}</h3>
                        <span className="position">{currentCollegue.position}</span>
                    </div>
                )}
            </div>
        </div>
    )
}