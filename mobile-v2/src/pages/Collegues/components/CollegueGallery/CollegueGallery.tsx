import React, { FC, useMemo, useState, useCallback, useEffect } from "react";
import cn from "classnames";

import "./style.scss";
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
  const { avatars, name } = collegue;

  const singleAvatar = useMemo(() => avatars.length > 1, [collegue]);
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
    console.log(123);
    setCurrentPhoto(currentAvatar);
  }, [])

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

  return (
    <div className="collegue-gallery">
      { singleAvatar ? (
          <div 
            className="avatars-lenta"
            onTouchStart={handleTouchStart()}
            onTouchMove={handleTouchMove()}
            onTouchEnd={handleTouchEnd(onTouchEnd)}
            style={dragStyle}
          >
            {
              avatars.map((avatar: string, i: number) => 
                <div className="avatar-holder" key={i} style={{minWidth: `${displayWidth}px`}}>
                  <img src={avatar} alt={name} />
                </div>
              )
            }
          </div>) : (
          <div className="avatar-holder">
            <img src={avatars[0]} />
          </div>
          )
        }

      {singleAvatar && (
        <div className="gallery-controls">
            {avatars.map((avatar: string, i: number) => 
                <div 
                  key={`${i}_${name}`} 
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