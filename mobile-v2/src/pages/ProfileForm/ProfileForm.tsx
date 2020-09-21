import React, { FC, useMemo } from "react";
import { Form } from "antd";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { AvatarField, InterestsField } from "./components";
import { Input, Text } from "shared/components";
import { Scrollable } from "core/Scrollable";
import { useHistory } from "react-router-dom";
import { ROUTES } from "shared/constants";

interface ProfileFormProps {
  onClose?: () => void;
}

export const ProfileForm: FC<ProfileFormProps> = (props) => {
  const { onClose } = props;
  const { useForm } = Form;
  const [form] = useForm();
  const { location } = useHistory();

  const initialForm = useMemo(() => location.pathname === ROUTES.profileEdit, [location.pathname]);

  return (
    <div className="profile-form">
      <Navbar 
        title="Профиль"
        leftButton={<span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>}
        rightButton={<span onClick={onClose} className="nav-button nav-button-ready">Готово</span>}
      />

      <Scrollable>
        <AvatarField />
        <div className="form-holder">
          <Form form={form}>
            <Input placeholder="Введите имя" label="Имя" />
            <Input placeholder="Введите фамилию" label="Фамилия" />
            <Input placeholder="Введите должность" label="Должность" />
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