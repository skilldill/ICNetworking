import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import { Form } from "antd";
import cn from "classnames";

import "../style.scss";
import { Input, Button, Loading } from "shared/components";
import { useHistory } from "react-router-dom";
import { ROUTES, StorageKeys } from "shared/constants";
import { ApiService } from "shared/http";
import { initApi } from "shared/http";
import { isFilled } from "shared/utils";

export const LoginForm: FC<{show: boolean}> = (props) => {
  const [formFilled, setFormFilled] = useState(false);
  const [loading, setLoading] = useState(false);

  const { show } = props;

  const { Item, useForm } = Form;
  const [form] = useForm();
  const history = useHistory();

  useEffect(() => {
    console.log(isFilled(form.getFieldsValue()));
  }, [form.getFieldsValue()])

  const handleSubmit = async (values: any) => {
    if (formFilled) {
      setLoading(true);

      try {
        const loginData = values;
        
        const { data } = await ApiService.login(loginData);
        const { token, profile_id, user_id } = data;
        
        localStorage.setItem(StorageKeys.token, token);
        localStorage.setItem(StorageKeys.userId, `${user_id}`);
        initApi(token);
        
        if (!!profile_id) {
          localStorage.setItem(StorageKeys.profileId, `${profile_id}`);
          history.push(ROUTES.collegues);
        } else {  
          const path = ROUTES.profileEdit;
          history.push(path);
        }
      } catch (error) {
        console.log(error.messgae);
      } finally {
        setLoading(false);
      }
    }
  }

  const handleFieldsChange = () => {
    setFormFilled(isFilled(form.getFieldsValue()));
  }

  // TEST ANIMATION SHOW
  const classes = useMemo(() => cn({
    "form": true,
    "form-login": true,
    "form-login-show": show
  }), [show])

  return (
    <>
      <div className={classes}>
        <h3>Вход</h3>
        <Form onFinish={handleSubmit} form={form} onFieldsChange={handleFieldsChange}>
          <Item name="email">
            <Input placeholder="Эл. адрес" autoComplete="off" />
          </Item>
          <Item name="password">
            <Input placeholder="Пароль" type="password" />
          </Item>
          <Button type="submit" disabled={!formFilled}>Войти</Button>
        </Form>
      </div>
      {loading && <Loading />}
    </>
  )
}