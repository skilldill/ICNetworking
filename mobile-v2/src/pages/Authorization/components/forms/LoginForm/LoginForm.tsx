import React, { FC, useEffect, useState, useCallback } from "react";
import { Form } from "antd";

import "../style.scss";
import { Input, Button } from "shared/components";
import { useHistory } from "react-router-dom";
import { ROUTES } from "shared/constants";

export const LoginForm: FC = () => {
  const [touchedFields, setTouchedFields] = useState(false);
  const { Item, useForm } = Form;
  const [form] = useForm();
  const history = useHistory();

  const handleSubmit = (values: any) => {
    console.log(values);
    history.push(ROUTES.collegues);
  }

  const handleFieldsChange = () => {
    setTouchedFields(true);
  }

  return (
    <div className="form form-login">
      <h3>Вход</h3>
      <Form onFinish={handleSubmit} form={form} onFieldsChange={handleFieldsChange}>
        <Item name="email">
          <Input placeholder="Эл. адрес" autoComplete="off" />
        </Item>
        <Item name="password">
          <Input placeholder="Пароль" type="password" />
        </Item>
        <Button type="submit" disabled={!touchedFields}>Войти</Button>
      </Form>
    </div>
  )
}