import React, { FC } from "react";
import "../style.scss";
import { Form } from "antd";
import { Input, Button } from "shared/components";
import { useHistory } from "react-router-dom";
import { ROUTES } from "shared/constants";

export const RegistrationForm: FC = () => {
  const { Item } = Form;
  const history = useHistory();

  const handleSubmit = (values: any) => {
    console.log(values);
    history.push(ROUTES.collegues);
  }

  return (
    <div className="form form-registration">
      <Form onFinish={handleSubmit}>
        <Item name="email">
          <Input placeholder="Эл. адрес" autoComplete="off" />
        </Item>
        <Item name="name">
          <Input placeholder="Имя" autoComplete="off" />
        </Item>
        <Item name="secondName">
          <Input placeholder="Фамилия" autoComplete="off" />
        </Item>
        <Item name="password">
          <Input placeholder="Пароль" type="password" />
        </Item>
        <Item name="passwordRepeat">
          <Input placeholder="Повторите пароль" type="password" />
        </Item>
        <Button type="submit">Зарегистрироваться</Button>
      </Form>
    </div>
  )
}