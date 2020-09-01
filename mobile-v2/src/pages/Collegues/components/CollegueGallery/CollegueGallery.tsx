import React, { FC, useMemo, useState, useCallback, useEffect } from "react";
import cn from "classnames";

import "./style.scss";
import { MAX_TOUCH_TRANSLATE } from "shared/constants";

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

  // STATE FOR CHANGE PHOTO
  const [startX, setStartX] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [transition, setTransition] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  // COMPONENT DID MOUNT
  useEffect(() => {
    setCurrentPhoto(currentAvatar);
  }, [])

  const addTransitionAnimation = useCallback((trans: number) => {
    const promiseAnimation = new Promise<NodeJS.Timeout>((resolve) => {
      setTransition(true);
      setTranslate(trans);

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

  const handleTouchStart = (event: React.TouchEvent) => {
    setStartX(event.touches[0].clientX - translate);
  }

  const handleTouchMove = (event: React.TouchEvent) => {
    const currentX = event.touches[0].clientX;
    const diff = currentX - startX;
    setTranslate(diff);
  }

  const handleTouchEnd = () => {
    const calcedTranslate = translate + (displayWidth * currentPhoto);

    if (Math.abs(calcedTranslate) > MAX_TOUCH_TRANSLATE) {

        // SWIPE TO RIGHT
        if (calcedTranslate > 0 && currentPhoto > 0) {
          const nextPhoto = currentPhoto - 1;
          const setedTranslate = displayWidth * -nextPhoto;

          console.log(setedTranslate, nextPhoto);

          setCurrentPhoto(nextPhoto);
          onSwipeRight();

          // ADD TRANSITION FOR ANIMATION
          addTransitionAnimation(setedTranslate);
        }

        // SWIPE TO LEFT
        if (calcedTranslate < 0 && (currentPhoto < avatars.length - 1)) {
          const nextPhoto = currentPhoto + 1;
          const setedTranslate = displayWidth * -nextPhoto;

          console.log(setedTranslate, nextPhoto);

          setCurrentPhoto(nextPhoto);
          onSwipeLeft();

          // ADD TRANSITION FOR ANIMATION
          addTransitionAnimation(setedTranslate);
        }

        // addTransitionAnimation(-currentPhoto * displayWidth);

        return;
    }

    
  }

  const dragStyle: React.CSSProperties = useMemo(() => ({
    transform: `translateX(${translate}px)`,
    transition : transition ? "all .3s" : "none"
  }), [translate, transition]);

  return (
    <div className="collegue-gallery">
      { singleAvatar ? (
          <div 
            className="avatars-lenta"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={dragStyle}
          >
            {
              avatars.map((avatar: string, i: number) => 
                <div className="avatar-holder" key={i} style={{minWidth: `${displayWidth}px`}}>
                  <img src={avatar} alt={name} />
                </div>
              )
            }
          </div>) : 
          <img src={avatars[0]} />
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