import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavbarActions } from "store/navbar/navbar.actions";
import { PartnersList } from "./components";
import { Page } from "shared/components";
import { useHistory } from "react-router";
import { ApiServise } from "shared/api";
import { Profile } from "shared/models";

export const Partners = () => {
    const dispatch = useDispatch();
    const history = useHistory();    

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const uid = localStorage.getItem('uid');
                if (!!uid) {
                    const data = await ApiServise.getUserInfo(uid)
                    console.log(data);
                }
            } catch (error) {
                history.push('/profile-settings');
                dispatch(NavbarActions.changeTitle("Настройки профиля"))
            }
        }

        // Проверяем авторизацию
        const jwt = localStorage.getItem('jwt');
        if (!!jwt) {
            dispatch(NavbarActions.changeTitle("Коллеги"))

            getUserInfo();

            // Тут необходимо выполнить редирект на форму заполнения инфы
        } else {
            history.push('/auth');
        }
        
    }, [dispatch])



    return (
        <Page>
            <div className="partners">
                <PartnersList />
            </div>
        </Page>
    )
}