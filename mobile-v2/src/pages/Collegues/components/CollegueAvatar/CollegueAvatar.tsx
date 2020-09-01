import React, { FC, useState, useCallback, useMemo, useEffect } from "react";
import { Empty } from "antd";
import cn from "classnames";
import "./style.scss";

// PICTURES
import UserAltPNG from "assets/pictures/user-alt.png";
import { MAX_TOUCH_TRANSLATE } from "shared/constants";
import { CollegueGallery } from "../CollegueGallery";

interface CollegueAvatarProps {
    collegues: any[];
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
    doSwipeToLeft: boolean;
    doSwipeToRight: boolean;
    galleryMode: boolean;
}

export const CollegueAvatar: FC<CollegueAvatarProps> = (props) => {
    const { onSwipeLeft, onSwipeRight, collegues, doSwipeToLeft, doSwipeToRight, galleryMode } = props;

    // CALC CURRENT INDEX COLLEGUE
    const [currentIndex, setCurrentIndex] = useState(0);

    // FOR ANIMATION SWIPE
    const [startX, setStartX] = useState(0);
    const [translate, setTranslate] = useState(0);
    const [transition, setTransition] = useState(false);
    const [opacity, setOpacity] = useState(1);

    // GALLERY AVATARS 
    const [currentAvatar, setCurrentAvatar] = useState(0);
    const [showGallery, setShowGallery] = useState(false);

    useEffect(() => {
        if (!galleryMode) {
            const timeout = setTimeout(() => {
                setShowGallery(true);
                clearTimeout(timeout);
            }, 300);
        } else {
            setShowGallery(false);
        }
    }, [galleryMode])

     // GALLERY CONTROLS
     const nextAvatar = useCallback(() => {
        if (currentAvatar < collegues[currentIndex].avatars.length - 1) {
            setCurrentAvatar(currentAvatar + 1);

            // RETURN TO DEFAULT
            setTransition(false);
            setTranslate(0);
            setOpacity(1);
        }
    }, [currentAvatar])

    const beforeAvatar = useCallback(() => {
        if (currentAvatar > 0) {
            setCurrentAvatar(currentAvatar - 1);

            // RETURN TO DEFAULT
            setTransition(false);
            setTranslate(0);
            setOpacity(1);
        }
    }, [currentAvatar])

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
            setCurrentAvatar(0);
            cb();
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
                setCurrentIndex(currentIndex + 1);
            })
    }, [setTransition, setOpacity, setTranslate, currentIndex]);

    const handleTouchStart = (event: React.TouchEvent) => {
        setStartX(event.touches[0].clientX);
    }

    const handleTouchMove = (event: React.TouchEvent) => {
        const currentX = event.touches[0].clientX;
        const diff = currentX - startX;
        setTranslate(diff);

        // CALC OPACITY
        const calcOpacity = 1 - Math.abs(diff) * 0.0008;
        setOpacity(calcOpacity);
    }

    const handleTouchEnd = () => {
        if (Math.abs(translate) > MAX_TOUCH_TRANSLATE) {

            // SWIPE TO RIGHT
            if (translate > 0) {
                galleryMode ? swipeToSide(200, onSwipeRight) : beforeAvatar();
            }

            // SWIPE TO LEFT
            if (translate < 0) {
                galleryMode ? swipeToSide(-200, onSwipeLeft) : nextAvatar();
            }

            return;
        }

        // ADD TRANSITION FOR ANIMATION
        addTransitionAnimation();
    }

    // SWIPE CONTROLS FOR OUTSIDE COMPONENTS
    useEffect(() => {
        doSwipeToLeft && swipeToSide(-200, onSwipeLeft);
    }, [doSwipeToLeft])

    useEffect(() => {
        doSwipeToRight && swipeToSide(200, onSwipeRight);
    }, [doSwipeToRight])

    // ADD OVERFLOW HIDDEN
    useEffect(() => {
        if (!galleryMode) {
            document.body.style.overflowY = "scroll";
        } else {
            document.body.style.overflowY = "hidden";
        }
    }, [galleryMode])

    const dragStyle: React.CSSProperties = useMemo(() => ({
        transform: `translateX(${translate}px) rotate(${translate * 0.1}deg)`,
        transition : transition ? "all .3s" : "none",
        opacity
    }), [translate, transition, opacity]);

    // RENDER AVATARS
    const renderAvatars = () => {
        return (
            <>
                {
                    !!collegues[currentIndex + 1] ? (
                        <div className="avatar avatar-next">
                            {!!collegues[currentIndex + 1].avatars.length ? (
                                <img 
                                    className={cn({
                                        "photo": true,
                                        "photo-gallery": !galleryMode
                                    })}  
                                    src={collegues[currentIndex + 1].avatars[0]} alt={collegues[currentIndex].name} 
                                />
                            ) : (
                                <div className="mock">
                                    <img src={UserAltPNG} alt=""/>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{paddingTop: 150}}>
                            <Empty description="Вы просвайпали всех" />
                        </div>
                    )
                }

                {
                    !!collegues[currentIndex] && !showGallery && (
                        <div className="avatar" 
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            style={galleryMode ? dragStyle : undefined}
                        >
                            {!!collegues[currentIndex].avatars.length ? (
                                <img 
                                    className={cn({
                                        "photo": true,
                                        "photo-gallery": !galleryMode
                                    })} 
                                    src={collegues[currentIndex].avatars[currentAvatar]} 
                                    alt={collegues[currentIndex].name} 
                                /> 
                            ) : (
                                <div className="mock">
                                    <img src={UserAltPNG} alt=""/>
                                </div>
                            )}
                        </div>
                    )
                }
            </>
        )
    }

    return (
        <div className="avatar-control">
            {showGallery && (
                <CollegueGallery 
                    collegue={collegues[currentIndex]}
                    onSwipeLeft={() => { setCurrentAvatar(currentAvatar + 1) }}
                    onSwipeRight={() => { setCurrentAvatar(currentAvatar - 1) }}
                    currentAvatar={currentAvatar}
                />
            )}


            {
                !!collegues[currentIndex + 1] ? (
                    <div className="avatar avatar-next">
                        {!!collegues[currentIndex + 1].avatars.length ? (
                            <img 
                                className={cn({
                                    "photo": true,
                                    "photo-gallery": !galleryMode
                                })}  
                                src={collegues[currentIndex + 1].avatars[0]} alt={collegues[currentIndex].name} 
                            />
                        ) : (
                            <div className="mock">
                                <img src={UserAltPNG} alt=""/>
                            </div>
                        )}
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
                        style={galleryMode ? dragStyle : undefined}
                    >
                        {showGallery && <div className="backdrop" />}
                        {!!collegues[currentIndex].avatars.length ? (
                            <img 
                                className={cn({
                                    "photo": true,
                                    "photo-gallery": !galleryMode
                                })} 
                                src={collegues[currentIndex].avatars[currentAvatar]} 
                                alt={collegues[currentIndex].name} 
                            /> 
                        ) : (
                            <div className="mock">
                                <img src={UserAltPNG} alt=""/>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}