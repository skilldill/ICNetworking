import React, { FC } from "react";
import { Form } from "antd";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { AvatarField } from "./components";

export const ProfileForm: FC = () => {
  const { useForm } = Form;
  const [form] = useForm();

  return (
    <div className="profile-form">
      <Navbar title="Профиль123" positionAbsolute/>
      <AvatarField />
    </div>
  )
}