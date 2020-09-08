import React, { FC, useMemo, useState } from "react";
import "../style.scss";
import { Form } from "antd";
import { Input, Button } from "shared/components";
import { useHistory } from "react-router-dom";
import { ROUTES } from "shared/constants";

enum FormParts {
  first,
  second
}

export const RegistrationForm: FC = () => {
  const { Item } = Form;
  const history = useHistory();
  const [partForm, setPartForm] = useState(FormParts.first);
  const [firstValues, setFirstValues] = useState({});

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
      return;
    }

    console.log({...firstValues, ...values});
    return;
  }

  return (
    <div className="form form-registration">
      <Form onFinish={handleSubmit}>
        {currentPart}
        <Button type="submit">{isFirstPart ? 'Далее' : 'Зарегистрироваться'}</Button>
      </Form>
    </div>
  )
}