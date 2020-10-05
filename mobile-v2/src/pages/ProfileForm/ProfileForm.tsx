import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "antd";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { AvatarField, InterestsField, PositionList, InterestList } from "./components";
import { Input, Text } from "shared/components";
import { Scrollable } from "core/Scrollable";
import { useHistory } from "react-router-dom";
import { ROUTES, StorageKeys } from "shared/constants";
import { CameraPhoto } from "@capacitor/core";
import { useDispatch, useSelector } from "react-redux";
import { profileModule } from "store/profile";
import { FadePage } from "core/FadePage";
import { SkillsList } from "./components/SkillsList";

interface ProfileFormProps {
  onClose?: () => void;
}

enum ListTypes {
  position,
  interests,
  skills
}

export const ProfileForm: FC<ProfileFormProps> = (props) => {
  const { onClose } = props;
  const { useForm, Item } = Form;
  const [form] = useForm();
  const { location, push } = useHistory();

  const dispatch = useDispatch();
  const { profile, profileId, userId } = useSelector(profileModule.selector);

  // ADDITIONAL FIELDS WITHOUT FORM
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [bio, setBio] = useState('');
  const [positionId, setPositionId] = useState<number | null>(null);
  
  // SHOWED LIST
  const [typeListPage, setTypeListPage] = useState<ListTypes>(ListTypes.position);
  const [showListPage, setShowListPage] = useState(false); 

  const currentList = useMemo(() => (
    <>
      {typeListPage === ListTypes.position && <PositionList onClose={() => setShowListPage(false)} />}
      {typeListPage === ListTypes.interests && <InterestList onClose={() => setShowListPage(false)} />}
      {typeListPage === ListTypes.skills && <SkillsList onClose={() => setShowListPage(false)} />}
    </>
  ), [typeListPage])

  const handleOpenList = (listType: ListTypes) => () => {
    setTypeListPage(listType);
    setShowListPage(true);
  }

  // CHECK PROFILE DATA
  useEffect(() => {
    if (!!profile) {
      const { bio, user_data, gallery } = profile;
      form.setFieldsValue({ ...user_data });

      if (!!bio) {
        setBio(bio);
      }
      
      if (!!gallery && !!gallery.length) {
        const currentAvatarIndex = gallery.length - 1;
        const { picture } = gallery[currentAvatarIndex];
        setAvatar(picture);
      }
    }
  }, [profile])

  const handleClearField = (fieldName: string) => () => {
    form.resetFields([fieldName]);
  }

  // Проверяем запускается форма первый ли раз
  const initialForm = useMemo(() => location.pathname === ROUTES.profileEdit, [location.pathname]);
  
  const cancelButton = useMemo(() => !initialForm ? (
    <span onClick={onClose} className="nav-button nav-button-cancel">Отмена</span>
  ): undefined, [onClose, initialForm])
  
  const handltSubmitForm = useCallback(async () => {
    const profileData = { user: userId, bio };
    
    if (initialForm) {
      dispatch(profileModule.actions.createProfile(profileData));
      push(ROUTES.collegues);
    } else {
      dispatch(profileModule.actions.updateProfile(profileId!, profileData));
    }

    !!onClose && onClose();
  }, [initialForm, profileId, userId, onClose, bio, dispatch]);

  const handleAddPhoto = useCallback((photo: CameraPhoto) => {
    const { dataUrl } = photo;

    if (initialForm) {
      const profileData = { user: userId, bio };
      dispatch(profileModule.actions.createProfile(profileData));
      dispatch(profileModule.actions.addPhoto(profileId!, dataUrl!));
    } else {
      dispatch(profileModule.actions.addPhoto(profileId!, dataUrl!));
    }
  }, [profileId, dispatch])

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
              <Input 
                placeholder="Введите имя" 
                label="Имя" 
                showClear 
                onClear={handleClearField("first_name")}
              />
            </Item>
            <Item name="last_name">
              <Input 
                placeholder="Введите фамилию" 
                label="Фамилия" 
                showClear 
                onClear={handleClearField("last_name")}
              />
            </Item>
            <Item name="position">
              <Input 
                placeholder="Введите должность" 
                label="Должность"
                autoComplete="off"
                onFocus={handleOpenList(ListTypes.position)}
              />
            </Item>
            <Item name="level">
              <Input 
                placeholder="Введите стаж" 
                label="Стаж работы в компании" 
                showClear 
                onClear={handleClearField("level")}
              />
            </Item>
          </Form>
        </div>
        {/* <InterestsField /> */}

        <div className="field-block">
          <h3>Мои интересы</h3>
          <Text 
            placeholder="Интересы" 
            onFocus={handleOpenList(ListTypes.interests)}
          />
        </div>
        
        <div className="field-block">
          <h3>Мои навыки</h3>
          <Text 
            placeholder="Навыки" 
            onFocus={handleOpenList(ListTypes.skills)}
          />
        </div>

        <div className="field-block">
          <h3>Информация о себе</h3>
          <Text 
            placeholder="Введите текст" 
            value={bio}
            // SIMPLAE CRUTCH :)
            onChange={({ currentTarget }) => setBio(currentTarget.value) }
          />
        </div>
      </Scrollable>

      <FadePage show={showListPage} direction="vertical">
        {currentList}
      </FadePage>
    </div>
  )
}