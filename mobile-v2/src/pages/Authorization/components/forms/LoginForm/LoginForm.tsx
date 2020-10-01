import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import { Form } from "antd";
import cn from "classnames";

import "../style.scss";
import { Input, Button, Loading } from "shared/components";
import { useHistory } from "react-router-dom";
import { ROUTES, StatusesUsing } from "shared/constants";
import { isFilled } from "shared/utils";
import { useDispatch, useSelector } from "react-redux";
import { profileModule } from "store/profile";

export const LoginForm: FC<{show: boolean}> = (props) => {
  const [formFilled, setFormFilled] = useState(false);

  const { show } = props;

  const { Item, useForm } = Form;
  const [form] = useForm();
  
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, status } = useSelector(profileModule.selector);

  useEffect(() => {
    console.log(isFilled(form.getFieldsValue()));
  }, [form.getFieldsValue()])

  useEffect(() => {
    console.log(status);
    if (status === StatusesUsing.default) {
      history.push(ROUTES.collegues);
    }

    if (status === StatusesUsing.edit) {
      history.push(ROUTES.profileEdit);
    }

    // DROP USING STATUS
    dispatch(profileModule.actions.setStatusUsing(null));
  }, [status])

  const handleSubmit = async (values: any) => {
    if (formFilled) { 
      dispatch(profileModule.actions.login(values));
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