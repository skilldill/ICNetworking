import React, { FC, useState, useMemo } from "react";

import "./style.scss";
import { LoginForm, RegistrationForm } from "./components";

enum AuthFormNames {
  login = "login",
  registration = "registration"
}

export const Authorization: FC = (props) => {
  const [activeForm, setActiveForm] = useState(AuthFormNames.login);
  const isLogin = activeForm === AuthFormNames.login;

  const authForm = useMemo(() => isLogin ? <LoginForm /> : <RegistrationForm />, [isLogin]);
  const formChanger = useMemo(() => isLogin ? <>У вас есть аккаунт? <a>Вход</a></> : <a>Регистрация</a>, [isLogin]);

  return (
    <div className="authorization">
      {authForm}
      <div className="authorization-form-changer">
        {formChanger}
      </div>
    </div>
  )
}