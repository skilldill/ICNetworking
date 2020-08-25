import React, { useState, useEffect } from "react";
import { IonInput, IonButton, IonItem, IonTextarea, IonAvatar } from "@ionic/react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import "./style.scss";
import defaultUser from "assets/default-user-image.png"
import { Page } from "shared/components";
import { ApiServise } from "shared/api";
import { NavbarActions } from "store/navbar/navbar.actions";

export const ProfileSettings = () => {
    const [name, setName] = useState('Гарри');
    const [surname, setSurname] = useState('Поттер');
    const [birthday, setBirthday] = useState('2020-11-05');
    const [about, setAbout] = useState('Мальчик который выжил');
    const [avatar, setAvatar] = useState<any | undefined>(undefined);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(NavbarActions.changeTitle("Настройки профиля"));
    }, [])

    const { mode } = useParams();

    const handleChangeField = (cb: (value: any) => void) => {
        return (event: any) => {
        const value = event.currentTarget.value;

        !!value && cb(value.toString());
    }}

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const uid = localStorage.getItem('uid');
        const fd = new FormData();

        const userData = { name, surname, birthday, about, userId: uid };

        fd.append('data', JSON.stringify(userData));
        !!avatar && fd.append('files.avatar', avatar);
        

        console.log(avatar);

        try {
            if (mode === "create") {
                await ApiServise.setUserInfo(userData);
            } else {
                !!uid && await ApiServise.updateUserInfo(uid, fd);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSetAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.currentTarget;
        if (!!files) {
            setAvatar(files[0]);
        }
    }

    return (
        <Page>    
            <div className="profile-settings">
                <form className="profile-settings-form" onSubmit={handleSubmit}>
                    <div className="avatar-block">
                        <img src={!!avatar ? window.URL.createObjectURL(avatar) : defaultUser} alt="user mock"/>
                        <input type="file" onChange={handleSetAvatar}/>
                    </div>
                    <IonItem>
                        <IonInput 
                            value={name}
                            placeholder="Имя" 
                            onInput={handleChangeField(setName)}
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonInput 
                            value={surname}
                            placeholder="Фамилия"
                            onInput={handleChangeField(setSurname)}
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonInput 
                            value={birthday}
                            placeholder="Дата рождения" 
                            type="date"
                            onInput={handleChangeField(setBirthday)}
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonTextarea 
                            value={about}
                            placeholder="О себе"
                            onInput={handleChangeField(setAbout)}
                        ></IonTextarea>
                    </IonItem>

                    <IonButton 
                        size="default" 
                        type="submit" 
                        expand="block"
                    >Сохранить</IonButton>
                </form>
            </div>
        </Page>
    )
}