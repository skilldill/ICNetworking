import React, { useState, useEffect, useCallback, useMemo } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { CollegueAvatar, CollegueModal, ButtonControls } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { colleguesModule } from "store/collegues";
import { Loading } from "shared/components";
import { StorageKeys } from "shared/constants";

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

    // // TEST USEEFFECT
    // useEffect(() => {
    //     console.log(collegueIndex);
    //     //  Смотреть на next в ответе запроса!!!
    // }, [collegueIndex])

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

    return (
        <div className="collegues">
            {loading ? <Loading /> : (
                <>
                    <Navbar 
                    title="Коллеги" 
                    onClickBack={isOpenModal ? () => { setIsOpenModal(false) } : undefined}
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
        </div>
    )
}