import React, { FC, useMemo, useState, useCallback, useEffect } from "react";
import cn from "classnames";

import "./style.scss";
import UserAltPNG from "assets/pictures/user-alt.png";
import { MAX_TOUCH_TRANSLATE } from "shared/constants";
import { useTouch } from "shared/hooks";

interface CollegueGalleryProps {
  collegue: any;
  currentAvatar: number;
  onSwipeRight: (avatarIndex?: number) => void;
  onSwipeLeft: (avatarIndex?: number) => void;
}

export const CollegueGallery: FC<CollegueGalleryProps>  = (props) => {
  const { collegue, currentAvatar, onSwipeLeft, onSwipeRight } = props;
  const { avatars, firstName } = collegue;

  const manyAvatars = useMemo(() => avatars.length > 1, [avatars]);
  const displayWidth = window.innerWidth;

  const {
    stateTranslateX,
    stateTransition,

    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,

    addTransitionAnimation,
  } = useTouch();

  const [currentPhoto, setCurrentPhoto] = useState(0);

  // COMPONENT DID MOUNT
  useEffect(() => {
    setCurrentPhoto(currentAvatar);
  }, [])


  // TEST USE EFFECT
  useEffect(() => {
    console.log(collegue.avatars);
  }, [collegue])

  const onTouchEnd = () => {
    const calcedTranslate = stateTranslateX + (displayWidth * currentPhoto);

    if (Math.abs(calcedTranslate) > MAX_TOUCH_TRANSLATE/2) {

        // SWIPE TO RIGHT
        if (calcedTranslate > 0 && currentPhoto > 0) {
          const nextPhoto = currentPhoto - 1;
          const setedTranslate = displayWidth * -nextPhoto;

          setCurrentPhoto(nextPhoto);
          onSwipeRight();

          // ADD TRANSITION FOR ANIMATION
          addTransitionAnimation(undefined, setedTranslate);

          return;
        }

        // SWIPE TO LEFT
        if (calcedTranslate < 0 && (currentPhoto < avatars.length - 1)) {
          const nextPhoto = currentPhoto + 1;
          const setedTranslate = displayWidth * -nextPhoto;

          setCurrentPhoto(nextPhoto);
          onSwipeLeft();

          // ADD TRANSITION FOR ANIMATION
          addTransitionAnimation(undefined, setedTranslate);

          return;
        }
    }

    addTransitionAnimation(undefined, -currentPhoto * displayWidth);
    return;
  }

  const dragStyle: React.CSSProperties = useMemo(() => ({
    transform: `translateX(${stateTranslateX}px)`,
    transition : stateTransition ? "all .3s" : "none"
  }), [stateTranslateX, stateTransition]);

  const singlePhoto = useMemo(() => !!avatars.length ? (
    <img src={avatars[0].picture} />
  ) : (
    <div className="mock-avatar">
      <img src={UserAltPNG} />
    </div>
  ), [avatars])

  return (
    <div className="collegue-gallery">
      {manyAvatars ? (
          <div 
            className="avatars-lenta"
            onTouchStart={handleTouchStart()}
            onTouchMove={handleTouchMove()}
            onTouchEnd={handleTouchEnd(onTouchEnd)}
            style={dragStyle}
          >
            {avatars.map((avatar: any, i: number) => 
              <div className="avatar-holder" key={i}>
                <img src={avatar.picture} alt={firstName} />
              </div>
            )}
          </div>
        ) : (
          <div className="avatar-holder">
            {singlePhoto}
          </div>
      )}

      {manyAvatars && (
        <div className="gallery-controls">
            {avatars.map((avatar: string, i: number) => 
                <div 
                  key={`${i}_${firstName}`} 
                  className={cn({
                      "gallery-control": avatars.length > 1,
                      "gallery-control-active": i === currentPhoto
                  })}
                ></div>
            )}
        </div>
      )}
    </div>
  )
}