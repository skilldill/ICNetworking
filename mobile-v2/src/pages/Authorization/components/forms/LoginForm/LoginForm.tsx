import React, { FC } from "react";
import { Form } from "antd";

import "../style.scss";
import { Input, Button } from "shared/components";

export const LoginForm: FC = () => {
  const { Item } = Form;

  const handleSubmit = (values: any) => {
    console.log(values);
  }

  return (
    <div className="form form-login">
      <Form onFinish={handleSubmit}>
        <Item name="email">
          <Input placeholder="Эл. адрес" autoComplete="off" />
        </Item>
        <Item name="password">
          <Input placeholder="Пароль" type="password" />
        </Item>
        <Button colorType="primary" type="submit">Войти</Button>
      </Form>
    </div>
  )
}