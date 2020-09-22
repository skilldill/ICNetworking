import React, { CSSProperties, FC, useMemo } from "react";
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
  const { onClose } = props;
  const { useForm } = Form;
  const [form] = useForm();
  const { location, push } = useHistory();

  // Проверяем запускается форма первый ли раз
  const initialForm = useMemo(() => location.pathname === ROUTES.profileEdit, [location.pathname]);

  const cancelButton = useMemo(() => !initialForm ? (
    <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
  ): undefined, [onClose, initialForm])
  
  const handltSubmitForm = async () => {
    const userId = localStorage.getItem(StorageKeys.userId);
    if (initialForm) {
      try {
        // Потому что сваггер тупит
        await http.post('http://45.154.74.54/api/users/profiles', {user: parseInt(userId!)});
        
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
            <Input name="name" placeholder="Введите имя" label="Имя" />
            <Input name="lastname" placeholder="Введите фамилию" label="Фамилия" />
            <Input name="position" placeholder="Введите должность" label="Должность" />
            <Input placeholder="Введите стаж" label="Стаж работы в компании" />
          </Form>
        </div>
        <InterestsField />
        <div className="about-field">
          <h3>Информация о себе</h3>
          <Text placeholder="Введите текст" />
        </div>
      </Scrollable>

    </div>
  )
}