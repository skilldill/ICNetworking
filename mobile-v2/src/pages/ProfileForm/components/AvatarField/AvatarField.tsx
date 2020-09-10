import React, { FC, useState, useMemo } from "react";
import { Camera, CameraResultType, CameraPhoto } from "@capacitor/core";

import "./style.scss";
import { ProfileAvatarSVG } from "assets/icons";

export const AvatarField: FC = () => {
    const [currentPhoto, setCurrentPhoto] = useState<CameraPhoto | null>(null);

    const handlePhoto = async () => {
        try {
            const photo = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Base64
            })
            setCurrentPhoto(photo);
        } catch(error) {
            console.log(error);
        }
    }

    const imageElement = useMemo(() => !!currentPhoto ? 
        <img src={currentPhoto.base64String} alt="avatar field" /> : 
        <img src={ProfileAvatarSVG} alt="avatar field" />    
    , [currentPhoto])

    return (
        <div className="avatar-field">
            <div className="photo">
                {imageElement}
            </div>
            <a href="#">Добавить фото</a>
        </div>
    )
}