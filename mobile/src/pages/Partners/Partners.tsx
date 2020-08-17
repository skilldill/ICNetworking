import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { NavbarActions } from "store/navbar/navbar.actions";
import { PartnersList } from "./components";
import { Page } from "shared/components";
import { useHistory } from "react-router";

export const Partners = () => {
    const dispatch = useDispatch();
    const history = useHistory();
        
    useEffect(() => {
        // Проверяем авторизацию
        const jwt = localStorage.getItem('jwt');
        if (!!jwt) {
            dispatch(NavbarActions.changeTitle("Коллеги"))

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