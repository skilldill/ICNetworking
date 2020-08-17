import React, { useState } from "react";
import { Page } from "shared/components";
import { IonInput, IonButton, IonItem, IonTextarea } from "@ionic/react";
import { ApiServise } from "shared/api";

export const ProfileSettings = () => {
    const [name, setName] = useState('Гарри');
    const [surname, setSurname] = useState('Поттер');
    const [birthday, setBirthday] = useState('2020-11-05');
    const [about, setAbout] = useState('Мальчик который выжил');

    const handleChangeField = (cb: (value: string) => void) => {
        return (event: any) => {
        const value = event.currentTarget.value;

        !!value && cb(value.toString());
    }}

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const uid = localStorage.getItem('uid');
        const userData = { name, surname, birthday, about, userId: uid };


        try {
            await ApiServise.setUserInfo(userData);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Page>    
            <div className="profile-settings">
                <form className="profile-settings-form" onSubmit={handleSubmit}>
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