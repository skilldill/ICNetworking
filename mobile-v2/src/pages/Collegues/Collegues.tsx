import React, { useState, useEffect, useCallback, useMemo } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { CollegueAvatar, CollegueModal, ButtonControls, FiltersBlock } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { colleguesModule } from "store/collegues";
import { Loading } from "shared/components";
import { StorageKeys } from "shared/constants";
import { spawn } from "child_process";
import { FadePage } from "core/FadePage";

export const Collegues = () => {
    const { collegues, loading } = useSelector(colleguesModule.selector);
    const dispatch = useDispatch();
    const profileId = localStorage.getItem(StorageKeys.profileId);

    const [collegueIndex, setCollegueIndex] = useState(0);

    // STATE FOR BUTTONS SWIPE
    const [doSwipeToLeft, setDoSwipeToLeft] = useState(false);
    const [doSwipeToRight, setDoSwipeToRight] = useState(false);

    // WORK WITH MODAL
    const [isOpenModal, setIsOpenModal] = useState(false);
    
    // FILTERS
    const [showFilters, setShowFilters] = useState(false);

    // DOWNLOAD COLLEGUES
    useEffect(() => {
        dispatch(colleguesModule.actions.fetchCollegues());
    }, [])

    useEffect(() => {
        const count = collegues.length - collegueIndex;
        if (count === 3) {
            dispatch(colleguesModule.actions.fetchCollegues(true));
        }
    }, [collegues, collegueIndex])

    const canSelectCollegue = useMemo(() => collegueIndex < collegues.length, [collegues, collegueIndex]);

    const handleSwipe = useCallback(() => {
        setCollegueIndex(collegueIndex + 1);
    }, [collegueIndex])

    const handleLike = useCallback(() => {
        const swipePromise = new Promise<NodeJS.Timeout>((resolve) => {
            setDoSwipeToRight(true);

            if (doSwipeToRight && !!collegues[collegueIndex]) {
                const collegueProfileId = collegues[collegueIndex].id;
                dispatch(colleguesModule.actions.matching(parseInt(profileId!), collegueProfileId));
                
                // TODO: 
                handleSwipe();
            }

            const timeout = setTimeout(() => {
                resolve(timeout);
            }, 450);
        })

        swipePromise
            .then((timeout) => {
                clearTimeout(timeout);
                setDoSwipeToRight(false);
            })
    }, [collegueIndex, doSwipeToRight])

    const handleSkip = useCallback(() => {
        const swipePromise = new Promise<NodeJS.Timeout>((resolve) => {
            setDoSwipeToLeft(true);

            const timeout = setTimeout(() => {
                resolve(timeout);
            }, 450);
        })

        swipePromise
            .then((timeout) => {
                clearTimeout(timeout);
                setDoSwipeToLeft(false);
            })
    }, [collegueIndex, setDoSwipeToLeft])

    // SCROLL FOR SHOW MORE INFO MODAL (EQUAL TO TELEGA)
    useEffect(() => {
        if (isOpenModal) {
            window.scroll({ top: 400, behavior: "smooth" });
            document.body.style.overflowX = "hidden";
        }
    }, [isOpenModal])


    return (
        <div className="collegues">
            {loading ? <Loading /> : (
                <>
                    <Navbar 
                        title="Коллеги" 
                        leftButton={
                            <span 
                                className="nav-right-btn"
                                onClick={() => setShowFilters(true)}
                            >Фильтры</span>
                        }
                    />

                    {canSelectCollegue && (
                        <ButtonControls 
                            onLike={handleLike}
                            onSkip={handleSkip}
                        />
                    )}

                    <CollegueModal 
                        collegue={collegues[collegueIndex]}
                        onOpen={() => { setIsOpenModal(true) }}
                        onClose={() => { setIsOpenModal(false) }}
                        doClose={isOpenModal}
                    />

                    <CollegueAvatar 
                        collegues={collegues}
                        onSwipeLeft={handleSwipe}
                        onSwipeRight={handleLike}
                        doSwipeToLeft={doSwipeToLeft}
                        doSwipeToRight={doSwipeToRight}
                        galleryMode={!isOpenModal}
                    />
                </>
            )}

            <FadePage show={showFilters} direction="horizontal">
                <FiltersBlock onClose={() => setShowFilters(false)} />
            </FadePage>
        </div>
    )
}