import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "antd";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { AvatarField, InterestsField } from "./components";
import { Input, Text } from "shared/components";
import { Scrollable } from "core/Scrollable";
import { useHistory } from "react-router-dom";
import { ROUTES, StorageKeys } from "shared/constants";
import { ApiService } from "shared/http";
import { CameraPhoto } from "@capacitor/core";

interface ProfileFormProps {
  onClose?: () => void;
}

export const ProfileForm: FC<ProfileFormProps> = (props) => {
  const profileId = localStorage.getItem(StorageKeys.profileId);
  const userId = localStorage.getItem(StorageKeys.userId);

  const { onClose } = props;
  const { useForm, Item } = Form;
  const [form] = useForm();
  const { location, push } = useHistory();

  // ADDITIONAL FIELDS WITHOUT FORM
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [bio, setBio] = useState('');
  const [positionId, setPositionId] = useState<number | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await ApiService.getUser(parseInt(userId!));
      form.setFieldsValue({ ...data });
    } catch(error) {
      console.log(error);
    }
  }, [userId, form, ApiService]);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await ApiService.getProfile(parseInt(profileId!));
      const { bio, user_data, gallery } = data;
      form.setFieldsValue({ ...user_data });
      setBio(bio);
      
      if (!!gallery.length) {
        const currentAvatarIndex = gallery.length - 1;
        const { picture } = gallery[currentAvatarIndex];
        setAvatar(picture);
      }
    } catch(error) {
      console.log(error);
    }
  }, [profileId, form, ApiService])

  const createProfile = useCallback(async () => {
    const profileData = { user: userId, bio };

    try {
      const { data } = await ApiService.createProfile(profileData);
      const { id } = data;
      localStorage.setItem(StorageKeys.profileId, `${id}`);
    } catch(error) {
      console.log(error.message);
    }
  }, [userId, bio, form])

  const updateProfile = useCallback(async () => {
    const profileData = { user: userId, bio };

    try {
      await ApiService.updateProfile(parseInt(profileId!), profileData);
    } catch(error) {
      console.log(error.message);
    }
  }, [userId, bio, form])

  // SET INITIAL VALUE FORMS
  useEffect(() => {
    // CHECK WHICH ID WE HAVE
    if (!!profileId) {
      fetchProfile();
    } else {
      fetchUser();
    }
  }, [form])

  // Проверяем запускается форма первый ли раз
  const initialForm = useMemo(() => location.pathname === ROUTES.profileEdit, [location.pathname]);

  const cancelButton = useMemo(() => !initialForm ? (
    <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
  ): undefined, [onClose, initialForm])
  
  const handltSubmitForm = useCallback(async () => {
    if (initialForm) {
      createProfile();
      push(ROUTES.collegues);
    } else {
      updateProfile();
    }

    !!onClose && onClose();
  }, [initialForm, onClose, createProfile, updateProfile]);

  const handleAddPhoto = useCallback(async (photo: CameraPhoto) => {
    const { dataUrl } = photo;

    try {
      if (initialForm) {
        // Если в самом начала попробовать загрузить фотку, 
        // то так как profileId еще нет, то не получится
        // поэтому сначала создаем profile
        await createProfile();
        const profileId = localStorage.getItem(StorageKeys.profileId);
        await ApiService.addPhoto(parseInt(profileId!), dataUrl!);
      } else {
        await ApiService.addPhoto(parseInt(profileId!), dataUrl!);
      }
    } catch(error) {
      console.log(error);
    }
  }, [ApiService.addPhoto])

  const scrollabelStyle: CSSProperties = useMemo(() => ({
    maxHeight: initialForm ? "calc(100vh - 70px)" : "calc(100vh - 125px)"
  }), [initialForm])

  return (
    <div className="profile-form">
      <Navbar 
        title="Профиль"
        leftButton={cancelButton}
        rightButton={<span onClick={handltSubmitForm} className="nav-button nav-button-ready">Готово</span>}
      />

      <Scrollable style={scrollabelStyle}>
        <AvatarField onChangePhoto={handleAddPhoto} photo={avatar} />
        <div className="form-holder">
          <Form form={form}>
            <Item name="first_name">
              <Input placeholder="Введите имя" label="Имя" />
            </Item>
            <Item name="last_name">
              <Input placeholder="Введите фамилию" label="Фамилия" />
            </Item>
            <Item name="position">
              <Input placeholder="Введите должность" label="Должность" />
            </Item>
            <Item name="level">
              <Input placeholder="Введите стаж" label="Стаж работы в компании" />
            </Item>
          </Form>
        </div>
        <InterestsField />
        <div className="about-field">
          <h3>Информация о себе</h3>
          <Text 
            placeholder="Введите текст" 
            value={bio}
            // SIMPLAE CRUTCH :)
            onChange={({ currentTarget }) => setBio(currentTarget.value) }
          />
        </div>
      </Scrollable>
    </div>
  )
}