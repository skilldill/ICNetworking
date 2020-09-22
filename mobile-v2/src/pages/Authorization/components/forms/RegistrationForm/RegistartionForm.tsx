import React, { FC, useMemo, useState, useEffect } from "react";
import cn from "classnames";

import "../style.scss";
import { Form } from "antd";
import { Input, Button } from "shared/components";
import { useHistory } from "react-router-dom";
import { ROUTES } from "shared/constants";
import { UsersService } from "shared/http/api";
import { isFilled } from "shared/utils";

enum FormParts {
  first,
  second
}

interface RegistrationFormProps {
  show: boolean, 
  keyboardOpened: boolean,
  onBack: () => void
}

export const RegistrationForm: FC<RegistrationFormProps> = (props) => {
  const { show, keyboardOpened, onBack } = props;

  const [filledForm, setFilledForm] = useState(false);
  
  const { Item, useForm } = Form;
  const [form] = useForm();
  const [partForm, setPartForm] = useState(FormParts.first);
  const [firstValues, setFirstValues] = useState({});

  const handleTouchFields = () => {
    setFilledForm(isFilled(form.getFieldsValue()));
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
      <Item name="first_name">
        <Input placeholder="Имя" autoComplete="off" />
      </Item>
      <Item name="last_name">
        <Input placeholder="Фамилия" autoComplete="off" />
      </Item>
    </>
  )
  
  const isFirstPart = useMemo(() => partForm === FormParts.first, [partForm]);
  const currentPart = useMemo(() => isFirstPart ? firstPart : secondPart, [isFirstPart]);
  
  const handleSubmit = async (values: any) => {
    if (isFirstPart) {
      setFirstValues({ ...values });
      setPartForm(FormParts.second);
      setFilledForm(false);
      return;
    }

    // REMOVE PASSWORD REPEAT FROM FORM VALUES
    const formValues = { ...firstValues, ...values };
    const { passwordRepeat, ...data } = formValues;
    
    // CHURMS FOR USERNAME
    data["username"] = data["first_name"];
    
    try {
      // TODO: Необходимо добавить загрузку
      await UsersService.usersCreate({ data });
      onBack();
    } catch (error) {
      console.log(error.message);
    }

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
      <Form form={form} onFinish={handleSubmit} onFieldsChange={handleTouchFields}>
        {currentPart}
        <Button type="submit" disabled={!filledForm}>{isFirstPart ? 'Далее' : 'Зарегистрироваться'}</Button>
      </Form>
    </div>
  )
}