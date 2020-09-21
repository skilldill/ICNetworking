import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import { Form } from "antd";
import cn from "classnames";

import "../style.scss";
import { Input, Button } from "shared/components";
import { useHistory } from "react-router-dom";
import { ROUTES, StorageKeys } from "shared/constants";
import { UsersService } from "shared/http/api";
import { initApi } from "shared/http";

export const LoginForm: FC<{show: boolean}> = (props) => {
  const { show } = props;

  const [touchedFields, setTouchedFields] = useState(false);
  const { Item, useForm } = Form;
  const [form] = useForm();
  const history = useHistory();

  const handleSubmit = async (values: any) => {
    try {
      const data = values;
      
      const { token, profile_id } = await UsersService.usersLogin({ data });
      localStorage.setItem(StorageKeys.token, token);
      initApi(token);
      
      if (!!profile_id) {
        history.push(ROUTES.collegues);
      } else {  
        const path = ROUTES.profileEdit;
        history.push(path);
      }

    } catch (error) {
      console.log(error.messgae);
    }
  }

  const handleFieldsChange = () => {
    setTouchedFields(true);
  }

  // TEST ANIMATION SHOW
  const classes = useMemo(() => cn({
    "form": true,
    "form-login": true,
    "form-login-show": show
  }), [show])

  return (
    <div className={classes}>
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