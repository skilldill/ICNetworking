import React, { FC } from "react";
import "../style.scss";
import { Form } from "antd";
import { Input, Button } from "shared/components";

export const RegistrationForm: FC = () => {
  const { Item } = Form;

  return (
    <div className="form form-registration">
      <Form>
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
        <Button colorType="primary">Зарегистрироваться</Button>
      </Form>
    </div>
  )
}