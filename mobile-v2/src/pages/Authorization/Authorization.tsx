import React, { FC, useState, useMemo } from "react";

import "./style.scss";
import { LoginForm, RegistrationForm } from "./components";
import MainLogoSVG from "assets/pictures/main-logo.svg";

enum AuthFormNames {
  login,
  registration
}

export const Authorization: FC = (props) => {
  const [activeForm, setActiveForm] = useState(AuthFormNames.login);
  const isLogin = activeForm === AuthFormNames.login;

  const handleClickChanger = () => {
    const nextForm = isLogin ? AuthFormNames.registration : AuthFormNames.login;
    setActiveForm(nextForm);
  }

  const authForm = useMemo(() => isLogin ? <LoginForm /> : <RegistrationForm />, [isLogin]);
  const formChanger = useMemo(() => isLogin ? 
    <a onClick={(e) => e.preventDefault()}>Регистрация</a> :
    <>У вас есть аккаунт? <a onClick={(e) => e.preventDefault()}>Вход</a></>, 
  [isLogin]);
  const title = useMemo(() => isLogin ? "Вход" : "Регистрация", [isLogin]);

  return (
    <div className="authorization">
      <div className="authorization-navbar">
        <h4>ICNetworking</h4>
      </div>
      <div className="logo">
        <img src={MainLogoSVG} alt="IC Networking"/>
      </div>
      <h3>{title}</h3>
      {authForm}
      <div className="authorization-changer-form" onClick={handleClickChanger}>
        {formChanger}
      </div>
    </div>
  )
}