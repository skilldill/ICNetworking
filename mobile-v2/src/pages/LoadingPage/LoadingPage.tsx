import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Loading } from "core/Loading";
import { ROUTES, StorageKeys } from "shared/constants";

/**
 * Эта страница необходима для прогрузки и проверки
 * всех данных при старте работы приложения
 */
export const LoadingPage = () => {
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem(StorageKeys.token);

        // Если токен есть то переходим в свайпы
        // Иначе в форму авторизации
        if (!!token) {
            history.push(ROUTES.collegues);
        } else {
            history.push(ROUTES.authorization);
        }

    }, [])

    return (
        <Loading />
    )
}