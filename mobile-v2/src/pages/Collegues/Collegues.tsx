import React, { useState, useEffect, useCallback } from "react";
import "./style.scss";
import { Navbar } from "core/Navbar";

import { CollegueAvatar, CollegueModal, ButtonControls } from "./components";

const mockCollegues = [
    { 
        avatar: 'https://api.time.com/wp-content/uploads/2014/07/daniel-radcliffe-harry-potter.jpg',
        name: "Гарри Поттер",
        position: "Мракоборец"
    },
    { 
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSh5isPNRRrzW4dLeVLNiYj7QlZfsQGapdr2Q&usqp=CAU',
        name: "Рон Уизли",
        position: "Домохозяйка"
    },
    { 
        avatar: 'https://i.pinimg.com/originals/f6/af/8b/f6af8b3e5cd5a1726b002f91885b85e7.png',
        name: "Гермиона Гренджер",
        position: "Мракоборец"
    },
    { 
        avatar: 'https://vignette.wikia.nocookie.net/harrypotter/images/3/30/Harry-potter-and-the-half--blood-prince-Luna.jpg/revision/latest?cb=20140521113232',
        name: "Полумна Лавгуд",
        position: "Директор газеты 'Придира'"
    },
    { 
        avatar: 'https://pm1.narvii.com/7081/27a6042de08e024d9e0eb7ea5b28176c322898d7r1-508-635v2_00.jpg',
        name: "Драко Малфой",
        position: "Бизнесмэн"
    }
]

export const Collegues = () => {
    const [collegueIndex, setCollegueIndex] = useState(0);

    // STATE FOR BUTTONS SWIPE
    const [doSwipeToLeft, setDoSwipeToLeft] = useState(false);
    const [doSwipeToRight, setDoSwipeToRight] = useState(false);

    // WORK WITH MODAL
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleSwipe = useCallback(() => {
        setCollegueIndex(collegueIndex + 1);
    }, [collegueIndex])

    // TEST EFFECT
    useEffect(() => {
        console.log(collegueIndex);
    }, [collegueIndex]);

    const handleLike = useCallback(() => {
        const swipePromise = new Promise<NodeJS.Timeout>((resolve) => {
            setDoSwipeToRight(true);

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
            <Navbar 
                title="Коллеги" 
                onClickBack={isOpenModal ? () => { setIsOpenModal(false) } : undefined}
            />

            <ButtonControls 
                onLike={handleLike}
                onSkip={handleSkip}
            />

            <CollegueModal 
                collegue={mockCollegues[collegueIndex]}
                onOpen={() => { setIsOpenModal(true) }}
                onClose={() => {}}
                doClose={isOpenModal}
            />

            <CollegueAvatar 
                collegues={mockCollegues}
                onSwipeLeft={handleSwipe}
                onSwipeRight={handleSwipe}
                doSwipeToLeft={doSwipeToLeft}
                doSwipeToRight={doSwipeToRight}
                galleryMode={!isOpenModal}
            />
        </div>
    )
}