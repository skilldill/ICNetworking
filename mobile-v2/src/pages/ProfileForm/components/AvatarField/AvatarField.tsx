import React, { FC, useState, useMemo } from "react";
import { Camera, CameraResultType, CameraPhoto } from "@capacitor/core";

import "./style.scss";
import { ProfileAvatarSVG } from "assets/icons";

interface AvatarFieldProps {
    onChangePhoto?: (photo: CameraPhoto) => void;
}

export const AvatarField: FC<AvatarFieldProps> = (props) => {
    const { onChangePhoto } = props;

    const [currentPhoto, setCurrentPhoto] = useState<CameraPhoto | null>(null);

    const handlePhoto = async () => {
        try {
            const photo = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.DataUrl
            })
            setCurrentPhoto(photo);
            !!onChangePhoto && onChangePhoto(photo);
        } catch(error) {
            console.log(error);
        }
    }

    const imageElement = useMemo(() => !!currentPhoto ? 
        <img className="avatar-img" src={currentPhoto.dataUrl} alt="avatar field" /> : 
        <img src={ProfileAvatarSVG} alt="avatar field" />    
    , [currentPhoto])

    return (
        <div className="avatar-field">
            <div className="photo">
                {imageElement}
            </div>
            <span onClick={handlePhoto}>Добавить фото</span>
        </div>
    )
}