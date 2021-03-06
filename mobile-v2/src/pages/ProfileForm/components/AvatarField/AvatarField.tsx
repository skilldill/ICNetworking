import React, { FC, useState, useMemo } from "react";
import { Camera, CameraResultType, CameraPhoto, CameraSource, CameraDirection } from "@capacitor/core";

import "./style.scss";
import { ProfileAvatarSVG } from "assets/icons";

interface AvatarFieldProps {
    photo?: string,
    onChangePhoto?: (photo: CameraPhoto) => void;
}

export const AvatarField: FC<AvatarFieldProps> = (props) => {
    const { onChangePhoto, photo } = props;

    const [currentPhoto, setCurrentPhoto] = useState<CameraPhoto | null>(null);

    const handlePhoto = async () => {
        try {
            const photo = await Camera.getPhoto({
                source: CameraSource.Prompt,
                promptLabelPhoto: "Открыть камеру",
                promptLabelPicture: "Выбрать из галереи",
                direction: CameraDirection.Front,
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
        photo ? 
            <img className="avatar-img" src={photo} alt="avatar field" /> :
            <img className="avatar-img-mock" src={ProfileAvatarSVG} alt="avatar field" />
    , [photo, currentPhoto])

    return (
        <div className="avatar-field">
            <div className="photo">
                {imageElement}
            </div>
            <span onClick={handlePhoto}>Добавить фото</span>
        </div>
    )
}