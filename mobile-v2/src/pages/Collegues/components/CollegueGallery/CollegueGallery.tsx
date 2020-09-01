import React, { FC, useMemo } from "react";
import cn from "classnames";

import "./style.scss";

interface CollegueGalleryProps {
  collegue: any;
  currentAvatar?: number;
  onSwipeRight: (avatarIndex?: number) => void;
  onSwipeLeft: (avatarIndex?: number) => void;
}

export const CollegueGallery: FC<CollegueGalleryProps>  = (props) => {
  const { collegue, currentAvatar, onSwipeLeft, onSwipeRight } = props;
  const { avatars, name } = collegue;

  const singleAvatar = useMemo(() => avatars.length > 1, [collegue]);
  const displayWidth = window.innerWidth;

  return (
    <div className="collegue-gallery">
      { singleAvatar ? (
          <div className="avatars-lenta">
            {
              avatars.map((avatar: string, i: number) => 
                <div className="avatar-holder" key={i} style={{width: `${displayWidth}px`}}>
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
                      "gallery-control-active": i === currentAvatar
                  })}
                ></div>
            )}
        </div>
      )}
    </div>
  )
}