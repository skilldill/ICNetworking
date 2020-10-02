import React, { useState, useEffect, useCallback, useMemo } from "react";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { CollegueAvatar, CollegueModal, ButtonControls } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { colleguesModule } from "store/collegues";

const mockCollegues = [
    { 
        avatars: [
            'https://api.time.com/wp-content/uploads/2014/07/daniel-radcliffe-harry-potter.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Daniel_Radcliffe_in_July_2015.jpg/1200px-Daniel_Radcliffe_in_July_2015.jpg',
            'https://m.media-amazon.com/images/M/MV5BMTg4NTExODc3Nl5BMl5BanBnXkFtZTgwODUyMDEzMDE@._V1_UY317_CR11,0,214,317_AL_.jpg',
        ],
        name: "Гарри Поттер",
        position: "Мракоборец"
    },
    { 
        avatars: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSh5isPNRRrzW4dLeVLNiYj7QlZfsQGapdr2Q&usqp=CAU',
            'https://upload.wikimedia.org/wikipedia/commons/9/93/RupertGrint2018.jpg',
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_40780.jpg',
            'https://www.biography.com/.image/t_share/MTIwNjA4NjMzNDMzMzI3MTE2/rupert-grint-6428-1-402.jpg',
        ],
        name: "Рон Уизли",
        position: "Домохозяйка"
    },
    { 
        avatars: [
            'https://i.pinimg.com/originals/f6/af/8b/f6af8b3e5cd5a1726b002f91885b85e7.png',
        ],
        name: "Гермиона Гренджер",
        position: "Мракоборец"
    },
    { 
        avatars: [
            'https://vignette.wikia.nocookie.net/harrypotter/images/3/30/Harry-potter-and-the-half--blood-prince-Luna.jpg/revision/latest?cb=20140521113232',
            'https://vignette.wikia.nocookie.net/harry-potter-all-games/images/f/f9/3927.jpg/revision/latest/top-crop/width/360/height/450?cb=20180109105059&path-prefix=ru',
        ],
        name: "Полумна Лавгуд",
        position: "Директор газеты 'Придира'"
    },
    { 
        avatars: [
            'https://pm1.narvii.com/7081/27a6042de08e024d9e0eb7ea5b28176c322898d7r1-508-635v2_00.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/d/dd/TomFeltonNov2010.jpg',
            'https://i.pinimg.com/originals/13/fc/c0/13fcc04c4b34ed332e40cca8b4f81431.jpg',
            'https://vignette.wikia.nocookie.net/harrypotter/images/5/5d/HP6_promo_Draco_Malfoy.jpg/revision/latest?cb=20160824140614&path-prefix=ru',
            'https://i.pinimg.com/originals/f4/15/cb/f415cb644f373d1723200325c934cc8f.jpg',
            'https://avatars.mds.yandex.net/get-zen_doc/112297/pub_5d5e66c57cccba00ae9d7264_5d5e6770a98a2a00aef89dd3/scale_1200',
        ],
        name: "Драко Малфой",
        position: "Бизнесмэн"
    },
    { 
        avatars: [],
        name: "Дамбалдор",
        position: "Директор школы Хогвартс"
    }
]

export const Collegues = () => {
    const { collegues } = useSelector(colleguesModule.selector);
    const dispatch = useDispatch();

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
            dispatch(colleguesModule.actions.fetchCollegues());
        }
    }, [collegues, collegueIndex])

    const canSelectCollegue = useMemo(() => collegueIndex < collegues.length, [collegueIndex]);

    const handleSwipe = useCallback(() => {
        setCollegueIndex(collegueIndex + 1);
    }, [collegueIndex])

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
                onSwipeRight={handleSwipe}
                doSwipeToLeft={doSwipeToLeft}
                doSwipeToRight={doSwipeToRight}
                galleryMode={!isOpenModal}
            />
        </div>
    )
}