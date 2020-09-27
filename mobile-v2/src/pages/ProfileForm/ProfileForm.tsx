import React, { CSSProperties, FC, useEffect, useMemo, useState } from "react";
import { Form } from "antd";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { AvatarField, InterestsField } from "./components";
import { Input, Text } from "shared/components";
import { Scrollable } from "core/Scrollable";
import { useHistory } from "react-router-dom";
import { ROUTES, StorageKeys } from "shared/constants";
import { UsersService } from "shared/http/api";
import { http } from "shared/http";

interface ProfileFormProps {
  onClose?: () => void;
}

export const ProfileForm: FC<ProfileFormProps> = (props) => {
  const profileId = localStorage.getItem(StorageKeys.profileId);
  const userId = localStorage.getItem(StorageKeys.userId);

  const { onClose } = props;
  const { useForm, Item } = Form;
  const [form] = useForm();
  const { location, push } = useHistory();

  // ADDITIONAL FIELDS WITHOUT FORM
  const [bio, setBio] = useState('');
  const [positionId, setPositionId] = useState<number | null>(null);

  // SET INITIAL VALUE FORMS
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = UsersService.usersRead()
        // const { data } = await http.get(`/api/users/${userId}/`);
        form.setFieldsValue({ ...data });
      } catch(error) {
        console.log(error);
      }
    }
    
    const fetchProfile = async () => {
      try {
        const { data } = await http.get(`/api/users/profiles/${profileId}/`);
        const { bio } = data;
        setBio(bio);
      } catch(error) {
        console.log(error);
      }
    }

    fetchUser();
    !!profileId && fetchProfile();
  }, [form])

  // Проверяем запускается форма первый ли раз
  const initialForm = useMemo(() => location.pathname === ROUTES.profileEdit, [location.pathname]);

  const cancelButton = useMemo(() => !initialForm ? (
    <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
  ): undefined, [onClose, initialForm])
  
  const handltSubmitForm = async () => {
    const userId = localStorage.getItem(StorageKeys.userId);
    const profileId = localStorage.getItem(StorageKeys.profileId);

    const profileData = {
      user: userId,
      bio,
      
    }    

    if (initialForm) {
      try {

      } catch(error) {

      }
    } else {
      try {

      } catch(error) {

      }
    }
  }

  const scrollabelStyle: CSSProperties = useMemo(() => ({
    maxHeight: initialForm ? "calc(100vh - 70px)" : "calc(100vh - 125px)"
  }), [initialForm])

  return (
    <div className="profile-form">
      <Navbar 
        title="Профиль"
        leftButton={cancelButton}
        rightButton={<span onClick={handltSubmitForm} className="nav-button nav-button-ready">Готово</span>}
      />

      <Scrollable style={scrollabelStyle}>
        <AvatarField />
        <div className="form-holder">
          <Form form={form}>
            <Item name="first_name">
              <Input placeholder="Введите имя" label="Имя" />
            </Item>
            <Item name="last_name">
              <Input placeholder="Введите фамилию" label="Фамилия" />
            </Item>
            <Item name="position">
              <Input placeholder="Введите должность" label="Должность" />
            </Item>
            <Item name="level">
              <Input placeholder="Введите стаж" label="Стаж работы в компании" />
            </Item>
          </Form>
        </div>
        <InterestsField />
        <div className="about-field">
          <h3>Информация о себе</h3>
          <Text 
            placeholder="Введите текст" 
            value={bio}
            // SIMPLAE CRUTCH :)
            onChange={({ currentTarget }) => setBio(currentTarget.value) }
          />
        </div>
      </Scrollable>
    </div>
  )
}