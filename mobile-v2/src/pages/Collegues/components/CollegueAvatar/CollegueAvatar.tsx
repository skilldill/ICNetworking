import React, { FC, useState, useCallback, useMemo, useEffect } from "react";
import { Empty } from "antd";
import "./style.scss";

// PICTURES
import UserAltPNG from "assets/pictures/user-alt.png";
import { MAX_TOUCH_TRANSLATE, StorageKeys } from "shared/constants";
import { CollegueGallery } from "../CollegueGallery";
import { useTouch } from "shared/hooks";
import { useDispatch } from "react-redux";

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

    const profileId = localStorage.getItem(StorageKeys.profileId);
    const dispatch = useDispatch();

    // CALC CURRENT INDEX COLLEGUE
    const [currentIndex, setCurrentIndex] = useState(0);

    const {
        stateTransition,
        stateTranslateX,

        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,

        setStateTransition,
        setStateTranslateX,

        addTransitionAnimation
    } = useTouch();

    // FOR ANIMATION SWIPE
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
            setStateTransition(false);
            setStateTranslateX(0);
            setOpacity(1);
        }
    }, [currentAvatar])

    const beforeAvatar = useCallback(() => {
        if (currentAvatar > 0) {
            setCurrentAvatar(currentAvatar - 1);

            // RETURN TO DEFAULT
            setStateTransition(false);
            setStateTranslateX(0);
            setOpacity(1);
        }
    }, [currentAvatar])

    const swipeToSide = useCallback((trans: number, cb: () => void) => {
        const swipePromise = new Promise<NodeJS.Timeout>((resolve) => {
            setStateTransition(true);
            setStateTranslateX(trans);
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
                setStateTransition(false);
                setStateTranslateX(0);
                setOpacity(1);
                setCurrentIndex(currentIndex + 1);
            })
    }, [setStateTransition, setOpacity, setStateTranslateX, currentIndex]);

    const onTouchEnd = () => {
        if (Math.abs(stateTranslateX) > MAX_TOUCH_TRANSLATE) {

            // SWIPE TO RIGHT
            if (stateTranslateX > 0) {
                galleryMode ? swipeToSide(200, onSwipeRight) : beforeAvatar();
            }

            // SWIPE TO LEFT
            if (stateTranslateX < 0) {
                galleryMode ? swipeToSide(-200, onSwipeLeft) : nextAvatar();
            }

            return;
        }

        // ADD TRANSITION FOR ANIMATION
        addTransitionAnimation();
    }

    const handleChangeOpacity = () => {
        const calcOpacity = 1 - Math.abs(stateTranslateX) * 0.0008; 
        setOpacity(calcOpacity);
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
            document.body.style.setProperty("overscroll-behavior", "auto");
            document.body.style.touchAction = "auto";
        } else {
            document.body.style.overflowY = "hidden";
            document.body.style.setProperty("overscroll-behavior", "none");
            document.body.style.touchAction = "none";
        }
    }, [galleryMode])

    const dragStyle: React.CSSProperties = useMemo(() => ({
        transform: `translateX(${stateTranslateX}px) rotate(${stateTranslateX * 0.1}deg)`,
        transition : stateTransition ? "all .3s" : "none",
        opacity
    }), [stateTranslateX, stateTransition, opacity]);

    return (
        <div className="avatar-control">
            {showGallery && !!collegues[currentIndex] && (
                <CollegueGallery 
                    collegue={collegues[currentIndex]}
                    onSwipeLeft={() => { setCurrentAvatar(currentAvatar + 1) }}
                    onSwipeRight={() => { setCurrentAvatar(currentAvatar - 1) }}
                    currentAvatar={currentAvatar}
                />
            )}

            {!!collegues[currentIndex + 1] ? (
                <div className="avatar avatar-next">
                    {!!collegues[currentIndex + 1].avatars.length ? (
                        <img 
                            className="photo"  
                            src={collegues[currentIndex + 1].avatars[0].picture} alt={collegues[currentIndex].firstName} 
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
            )}

            {!!collegues[currentIndex] && (
                <div className="avatar" 
                    onTouchStart={handleTouchStart()}
                    onTouchMove={handleTouchMove(handleChangeOpacity)}
                    onTouchEnd={handleTouchEnd(onTouchEnd)}
                    style={galleryMode ? dragStyle : undefined}
                >
                    {showGallery && <div className="avatar-control-backdrop" />}
                    {!!collegues[currentIndex].avatars.length ? (
                        <img 
                            className="photo" 
                            src={collegues[currentIndex].avatars[currentAvatar].picture} 
                            alt={collegues[currentIndex].firstName} 
                        /> 
                    ) : (
                        <div className="mock">
                            <img src={UserAltPNG} alt=""/>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

// У img был этот класс чтобы при открытии галлереи
// картинка типо подстраивалась
//"photo-gallery": !galleryMode