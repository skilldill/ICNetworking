import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "antd";

import "./style.scss";
import { Navbar } from "core/Navbar";
import { AvatarField, PositionList, InterestList, DepartmentList, SkillsList, InterestsField } from "./components";
import { Input, Text, PartBlock } from "shared/components";
import { Scrollable } from "core/Scrollable";
import { useHistory } from "react-router-dom";
import { ROUTES, StorageKeys } from "shared/constants";
import { CameraPhoto } from "@capacitor/core";
import { useDispatch, useSelector } from "react-redux";
import { profileModule } from "store/profile";
import { FadePage } from "core/FadePage";
import { Page } from "core/Page";

interface ProfileFormProps {
  onClose?: () => void;
}

enum ListTypes {
  position,
  interests,
  skills,
  department
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
  const [position, setPosition] = useState<any | null>(null);
  const [department, setDepartment] = useState<any | null>(null);
  const [interests, setInterests] = useState<any[]>([]);

  // SHOWED LIST
  const [typeListPage, setTypeListPage] = useState<ListTypes | null>(null);
  const [showListPage, setShowListPage] = useState(false); 

  const handleCloseList = () => {
    setShowListPage(false);
    setTypeListPage(null);
  }

  const handleSelectItem = (setValueCb: any) => (value: any) => {
    setValueCb(value);
  }

  const handleRemoveInterest = (id: number) => {
    const updatedInterests = interests.filter((interest) => interest.id !== id);
    setInterests(updatedInterests);
  }

  const handleSelectInterest = (value: any) => {
    const checkedInterest = interests.find((interest) => interest.id === value.id);

    if (!checkedInterest) {
      setInterests([...interests, value])
    }
  }

  const currentList = useMemo(() => (
    <>
      {typeListPage === ListTypes.position && <PositionList onClose={handleCloseList} onSelect={handleSelectItem(setPosition)} />}
      {typeListPage === ListTypes.interests && <InterestList onClose={handleCloseList} onSelect={handleSelectItem(handleSelectInterest)} />}
      {typeListPage === ListTypes.skills && <SkillsList onClose={handleCloseList} />}
      {typeListPage === ListTypes.department && <DepartmentList onClose={handleCloseList} onSelect={handleSelectItem(setDepartment)} />}
    </>
  ), [typeListPage])

  const handleOpenList = (listType: ListTypes) => () => {
    setTypeListPage(listType);
    setShowListPage(true);
  }

  useEffect(() => {
    const fields = {
      position: !!position ? position.name : profile.position_name,
      department: !!department ? department.name : profile.department_name,
      interests: !!interests.length ? interests : profile.interest_names,
    }

    console.log(fields);

    form.setFieldsValue(fields);
  }, [position, department, interests])

  // CHECK PROFILE DATA
  useEffect(() => {
    if (!!profile) {
      const { bio, user_data, gallery, interest_names, interests } = profile;
      form.setFieldsValue({ ...user_data });

      if (!!bio) {
        setBio(bio);
      }
      
      if (!!interest_names && !!interest_names.length) {
        setInterests(interest_names.map((name: string, i: number) => ({ name, id: interests[i] })));
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
    const profileData = { 
      bio,
      user: userId,
      position: !!position ? position.id : undefined,
      department: !!department ? department.id : undefined,
      interests: !!interests.length ? interests.map((interest: any) => interest.id) : undefined
    };
    
    if (initialForm) {
      dispatch(profileModule.actions.createProfile(profileData));
      push(ROUTES.collegues);
    } else {
      dispatch(profileModule.actions.updateProfile(profileId!, profileData));
    }

    !!onClose && onClose();
  }, [initialForm, profileId, userId, onClose, bio, position, department, interests, dispatch]);

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

  // const scrollabelStyle: CSSProperties = useMemo(() => ({
  //   maxHeight: initialForm ? "calc(100vh - 70px)" : "calc(100vh - 125px)"
  // }), [initialForm])

  return (
    <Page className="profile-form">
      <Navbar 
        title="Профиль"
        leftButton={cancelButton}
        rightButton={<span onClick={handltSubmitForm} className="nav-button nav-button-ready">Готово</span>}
      />

      <Scrollable>
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
            <Item name="email">
              <Input 
                placeholder="Введите эл.адрес" 
                label="Эл.адрес" 
                showClear 
                onClear={handleClearField("email")}
              />
            </Item>
            <Item name="department">
              <Input 
                placeholder="Назавание подразделения" 
                label="Отдел"
                autoComplete="off"
                showClear
                onClear={() => {}}
                onFocus={handleOpenList(ListTypes.department)}
              />
            </Item>
            <Item name="position">
              <Input 
                placeholder="Введите должность" 
                label="Должность"
                autoComplete="off"
                showClear
                onClear={() => {}}
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

        <PartBlock title="Мои интересы">
          <InterestsField 
            interests={interests}
            onClick={handleOpenList(ListTypes.interests)}
            onRemove={handleRemoveInterest}
          />
        </PartBlock>

        <PartBlock title="Мои достижения">
        </PartBlock>        

        <PartBlock title="Мои навыки">
          <Text 
            placeholder="Навыки" 
          />
        </PartBlock>

        <PartBlock title="Информация о себе">
          <Text 
            placeholder="Введите текст" 
            value={bio}
            // SIMPLAE CRUTCH :)
            onChange={({ currentTarget }) => setBio(currentTarget.value) }
          />
        </PartBlock>
      </Scrollable>

      <FadePage show={showListPage} direction="vertical">
        {currentList}
      </FadePage>
    </Page>
  )
}