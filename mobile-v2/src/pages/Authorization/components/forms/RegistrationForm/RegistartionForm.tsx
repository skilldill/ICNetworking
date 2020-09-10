import React, { FC, useMemo, useState, useEffect } from "react";
import cn from "classnames";

import "../style.scss";
import { Form } from "antd";
import { Input, Button } from "shared/components";
import { useHistory } from "react-router-dom";
import { ROUTES } from "shared/constants";

enum FormParts {
  first,
  second
}

export const RegistrationForm: FC<{show: boolean, keyboardOpened: boolean}> = (props) => {
  const { show, keyboardOpened } = props;

  const [touchedFields, setTouchedFields] = useState(false);
  
  const { Item } = Form;
  const history = useHistory();
  const [partForm, setPartForm] = useState(FormParts.first);
  const [firstValues, setFirstValues] = useState({});

  const handleTouchFields = () => {
    setTouchedFields(true);
  }

  const firstPart = (
    <>
      <Item name="email">
        <Input placeholder="Эл. адрес" autoComplete="off" />
      </Item>
      <Item name="password">
          <Input placeholder="Пароль" type="password" />
        </Item>
      <Item name="passwordRepeat">
        <Input placeholder="Повторите пароль" type="password" />
      </Item>
    </>
  )

  const secondPart = (
    <>
      <Item name="name">
        <Input placeholder="Имя" autoComplete="off" />
      </Item>
      <Item name="secondName">
        <Input placeholder="Фамилия" autoComplete="off" />
      </Item>
    </>
  )
  
  const isFirstPart = useMemo(() => partForm === FormParts.first, [partForm]);
  const currentPart = useMemo(() => isFirstPart ? firstPart : secondPart, [isFirstPart]);
  
  const handleSubmit = (values: any) => {
    if (isFirstPart) {
      setFirstValues({...values});
      setPartForm(FormParts.second);
      setTouchedFields(false);
      return;
    }

    console.log({...firstValues, ...values});
    return;
  }

  // TEST ANIMATION SHOW
  const classes = useMemo(() => cn({
    "form": true,
    "form-registration": true,
    "form-registration-show": show,
    "form-registration-up": keyboardOpened,
  }), [show, keyboardOpened])

  return (
    <div className={classes}>
      <h3>Регистрация</h3>
      <Form onFinish={handleSubmit} onFieldsChange={handleTouchFields}>
        {currentPart}
        <Button type="submit" disabled={!touchedFields}>{isFirstPart ? 'Далее' : 'Зарегистрироваться'}</Button>
      </Form>
    </div>
  )
}