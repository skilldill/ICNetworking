import React from "react";
import "./style.scss";
import { Navbar } from "core/Navbar";

import { CollegueAvatar, CollegueModal, ButtonControls } from "./components";

const mockCollegues = [
    { avatar: 'https://api.time.com/wp-content/uploads/2014/07/daniel-radcliffe-harry-potter.jpg' },
    { avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSh5isPNRRrzW4dLeVLNiYj7QlZfsQGapdr2Q&usqp=CAU' },
    { avatar: 'https://i.pinimg.com/originals/f6/af/8b/f6af8b3e5cd5a1726b002f91885b85e7.png' },
    { avatar: 'https://vignette.wikia.nocookie.net/harrypotter/images/3/30/Harry-potter-and-the-half--blood-prince-Luna.jpg/revision/latest?cb=20140521113232' },
    { avatar: 'https://pm1.narvii.com/7081/27a6042de08e024d9e0eb7ea5b28176c322898d7r1-508-635v2_00.jpg' }
]

export const Collegues = () => {
    return (
        <div className="collegues">
            <Navbar title="Коллеги" />

            <ButtonControls 
                onLike={() => {}}
                onSkip={() => {}}
            />

            <CollegueModal />

            <CollegueAvatar 
                collegues={mockCollegues}
                onSwipeLeft={() =>{}}
                onSwipeRight={() => {}}
            />
        </div>
    )
}