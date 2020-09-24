import React, { CSSProperties, FC, useEffect, useMemo } from "react";
import { Form } from "antd";
import { Input as AInput } from "antd";

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
  const { onClose } = props;
  const { useForm, Item } = Form;
  const [form] = useForm();
  const { location, push } = useHistory();

  // SET INITIAL VALUE FORMS
  useEffect(() => {
    const userId = localStorage.getItem(StorageKeys.userId);
    
    const fetchUser = async () => {
      try {
        const { data } = await http.get(`/api/users/${userId}/`);
        form.setFieldsValue({ ...data });
      } catch(error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [form])

  // Проверяем запускается форма первый ли раз
  const initialForm = useMemo(() => location.pathname === ROUTES.profileEdit, [location.pathname]);

  const cancelButton = useMemo(() => !initialForm ? (
    <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
  ): undefined, [onClose, initialForm])
  
  const handltSubmitForm = async () => {
    const userId = localStorage.getItem(StorageKeys.userId);

    if (initialForm) {
      try {
        const profileData = form.getFieldsValue();
        console.log(profileData);
        // Потому что сваггер тупит
        // await http.post('/api/users/profiles/', { user: parseInt(userId!), ...profileData });
        // UsersService.usersProfilesCreate({ data: {} })
        return;
      } catch(error) {
        console.log(error);
      } finally {
        push(ROUTES.collegues);
      }
    }

    onClose && onClose();
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
            <Item name="position">
              <Input placeholder="Введите стаж" label="Стаж работы в компании" />
            </Item>
          </Form>
        </div>
        <InterestsField />
        <div className="about-field">
          <h3>Информация о себе</h3>
          <Text 
            placeholder="Введите текст" 
            value={form.getFieldValue('bio')}
            // SIMPLAE CRUTCH :)
            onChange={({ currentTarget }) => { form.setFieldsValue({ bio: currentTarget.value }) }}
          />
        </div>
      </Scrollable>
    </div>
  )
}