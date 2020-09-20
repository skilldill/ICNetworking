import React, { useEffect, useMemo } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import "./style.scss";
import { ROUTES, StorageKeys } from "shared/constants";

/**
 * Эта страница необходима для прогрузки и проверки
 * всех данных при старте работы приложения
 */
export const LoadingPage = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
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
        <div className="loading-page">
            <Spin indicator={antIcon} size="large" />
        </div>
    )
}