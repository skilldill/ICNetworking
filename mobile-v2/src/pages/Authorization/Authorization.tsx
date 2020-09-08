import React, { FC, useState, useMemo, useEffect, CSSProperties } from "react";
import { Plugins } from "@capacitor/core";
import cn from "classnames";

import "./style.scss";
import { LoginForm, RegistrationForm } from "./components";
import MainLogoSVG from "assets/pictures/main-logo.svg";

//ICONS
import { ArrowBackSVG } from "assets/icons";

enum AuthFormNames {
  login,
  registration
}

export const Authorization: FC = (props) => {
  const [activeForm, setActiveForm] = useState(AuthFormNames.login);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const isLogin = activeForm === AuthFormNames.login;
  const { Keyboard } = Plugins;

  // COMPONENT DID MOUNT
  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => setShowKeyboard(true));
    Keyboard.addListener('keyboardWillHide', () => setShowKeyboard(false));
  }, [])

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

  const logoClasses = useMemo(() => cn({
    "logo": true, 
    "logo-small": showKeyboard
  }), [showKeyboard])

  const classesNavbar = useMemo(() => cn({
    "authorization-navbar": true,
    "authorization-navbar-show-title": showKeyboard
  }), [showKeyboard])

  const styleButtonBack: CSSProperties = useMemo(() => ({
    opacity: activeForm === AuthFormNames.registration ? '1' : '0'
  }), [activeForm])

  return (
    <div className="authorization">
      <div className={classesNavbar}>
        <button style={styleButtonBack} onClick={() => setActiveForm(AuthFormNames.login)}>
          <img src={ArrowBackSVG} alt="Назад"/>
        </button>
        <h4>ICNetworking</h4>
      </div>
      <div className={logoClasses}>
        <img src={MainLogoSVG} alt="IC Networking"/>
      </div>
      <h3>{title}</h3>
      {authForm}
      {!showKeyboard && (
        <div className="authorization-changer-form" onClick={handleClickChanger}>
          {formChanger}
        </div>
      )}
    </div>
  )
}