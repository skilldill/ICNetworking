import React, { FC } from "react";
import { Form } from "antd";

import "../style.scss";
import { Input, Button } from "shared/components";
import { useHistory } from "react-router-dom";
import { ROUTES } from "shared/constants";

export const LoginForm: FC = () => {
  const { Item, useForm } = Form;
  const [form] = useForm();
  const history = useHistory();

  const handleSubmit = (values: any) => {
    console.log(values);
    history.push(ROUTES.collegues);
  }

  return (
    <div className="form form-login">
      <Form onFinish={handleSubmit} form={form}>
        <Item name="email">
          <Input placeholder="Эл. адрес" autoComplete="off" />
        </Item>
        <Item name="password">
          <Input placeholder="Пароль" type="password" />
        </Item>
        <Button type="submit">Войти</Button>
      </Form>
    </div>
  )
}