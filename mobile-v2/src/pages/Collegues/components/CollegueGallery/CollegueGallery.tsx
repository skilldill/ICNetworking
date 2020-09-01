import React, { FC } from "react";

import "./style.scss";

interface CollegueGalleryProps {
  avatars: string[],
  onSwipeRight: (avatarIndex?: number) => void;
  onSwipeLeft: (avatarIndex?: number) => void;
}

export const CollegueGallery: FC<CollegueGalleryProps>  = (props) => {
  return (
    <div className="collegue-gallery">
      
    </div>
  )
}