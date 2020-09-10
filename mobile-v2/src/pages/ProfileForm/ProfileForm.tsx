import React, { FC } from "react";
import { Form } from "antd";

import "./style.scss";
import { Navbar } from "core/Navbar";

export const ProfileForm: FC = () => {
  const { useForm } = Form;
  const [form] = useForm();

  return (
    <div className="profile-form">
      <Navbar title="Профиль123" positionAbsolute/>
      <h2>
        Профиль форм
      </h2>
    </div>
  )
}