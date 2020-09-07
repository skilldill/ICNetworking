import React, { FC } from "react";

import "./style.scss";
import { LoginForm, RegistrationForm } from "./components";

export const Authorization: FC = (props) => {
  return (
    <div className="authorization">
      {/* <LoginForm /> */}
      <RegistrationForm />
    </div>
  )
}