import React, { FC } from "react";
import { Form } from "antd";

import "../style.scss";
import { Input } from "shared/components";

export const LoginForm: FC = () => {
  const { Item } = Form;

  return (
    <div className="form form-login">
      <Form>
        <Item name="email">
          <Input placeholder="Эл. адрес" />
        </Item>
        <Item name="password">
          <Input placeholder="Пароль" type="password" />
        </Item>
      </Form>
    </div>
  )
}