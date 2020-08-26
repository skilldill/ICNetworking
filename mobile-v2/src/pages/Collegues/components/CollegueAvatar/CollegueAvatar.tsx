import React, { FC, useState, useCallback, useMemo } from "react";
import { Empty } from "antd";
import "./style.scss";

// PICTURES
import UserAltPNG from "assets/pictures/user-alt.png";
import { MAX_TOUCH_TRANSLATE } from "shared/constants";

interface CollegueAvatarProps {
    collegues: any[];
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
}

export const CollegueAvatar: FC<CollegueAvatarProps> = (props) => {
    const { onSwipeLeft, onSwipeRight, collegues } = props;

    // CALC CURRENT INDEX COLLEGUE
    const [currentIndex, setCurrentIndex] = useState(0);

    // FOR ANIMATION SWIPE
    const [startX, setStartX] = useState(0);
    const [translate, setTranslate] = useState(0);
    const [transition, setTransition] = useState(false);
    const [opacity, setOpacity] = useState(1);

    const addTransitionAnimation = useCallback(() => {
        const promiseAnimation = new Promise<NodeJS.Timeout>((resolve) => {
            setTransition(true);
            setTranslate(0);
            setOpacity(1);
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

    const swipeToSide = useCallback((trans: number, cb: () => void) => {
        const swipePromise = new Promise<NodeJS.Timeout>((resolve) => {
            setTransition(true);
            setTranslate(trans);
            setOpacity(0);

            const timeout = setTimeout(() => {
                resolve(timeout);
            }, 400);
        })

        swipePromise
            .then((timeout) => {
                clearTimeout(timeout);
                setTransition(false);
                setTranslate(0);
                setOpacity(1);

                cb();
            })
    }, [setTransition, setOpacity, setTranslate]);

    const handleTouchStart = (event: React.TouchEvent) => {
        setStartX(event.touches[0].clientX);
    }

    const handleTouchMove = (event: React.TouchEvent) => {
        const currentX = event.touches[0].clientX;
        const diff = currentX - startX;
        setTranslate(diff);

        // CALC OPACITY
        const calcOpacity = 1 - Math.abs(diff) * 0.005;
        setOpacity(calcOpacity);
    }

    const handleTouchEnd = () => {
        if (Math.abs(translate) > MAX_TOUCH_TRANSLATE) {

            // SWIPE TO RIGHT
            if (translate > 0) {
                swipeToSide(200, onSwipeRight);
            }

            // SWIPE TO LEFT
            if (translate < 0) {
                swipeToSide(-200, onSwipeLeft);
            }
            setCurrentIndex(currentIndex + 1);
            return;
        }

        // ADD TRANSITION FOR ANIMATION
        addTransitionAnimation();
    }

    const dragStyle: React.CSSProperties = useMemo(() => ({
        transform: `translateX(${translate}px)`,
        transition : transition ? "all .3s" : "none",
        opacity
    }), [translate, transition, opacity]);

    const renderCollegues = useMemo(() => {
        return (
            <>
                {
                    !!collegues[currentIndex + 1] ? (
                        <div className="avatar avatar-next">
                            <div className="mock">
                                <img src={UserAltPNG} alt=""/>
                            </div>
                        </div>
                    ) : (
                        <Empty description="Вы просвайпали всех" />
                    )
                }
                <div className="avatar" 
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={dragStyle}
                >
                    <div className="mock">
                        <img src={UserAltPNG} alt=""/>
                    </div>
                </div>
            </>
        )
    }, [currentIndex])

    return (
        <div className="avatar-control">
            {
                !!collegues[currentIndex + 1] ? (
                    <div className="avatar avatar-next">
                        <div className="mock">
                            <img src={UserAltPNG} alt=""/>
                        </div>
                    </div>
                ) : (
                    <div style={{paddingTop: 150}}>
                        <Empty description="Вы просвайпали всех" />
                    </div>
                )
            }
            {
                !!collegues[currentIndex] && (
                    <div className="avatar" 
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={dragStyle}
                    >
                        <div className="mock">
                            <img src={UserAltPNG} alt=""/>
                        </div>
                    </div>
                )
            }
        </div>
    )
}