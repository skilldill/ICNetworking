import React, { useCallback, useEffect } from "react";
import { Plugins } from "@capacitor/core";
import { useHistory } from "react-router-dom";

import { Loading } from "core/Loading";
import { ROUTES, StorageKeys } from "shared/constants";
import { useDispatch } from "react-redux";
import { IosUtils } from "shared/utils";
import { commonModule } from "store/common";

/**
 * Эта страница необходима для прогрузки и проверки
 * всех данных при старте работы приложения
 */
export const LoadingPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { Device } = Plugins;

    const checkInfo = useCallback(async () => {
        const token = localStorage.getItem(StorageKeys.token);
        const info = await Device.getInfo();
        const { platform } = info;

        // Нужно проверить платформу
        // Для мобильных платформ тип undefined это true
        if (platform === "ios" || platform === "android") {
            IosUtils.checkBrow((hasBrow) => { dispatch(commonModule.actions.setWithBrow(hasBrow)) });

            // Если токен есть то переходим в свайпы
            // Иначе в форму авторизации
            if (token === "undefined" || !token) {
                history.push(ROUTES.authorization);
            } else {
                history.push(ROUTES.collegues);
            }

            return;
        }

        // Если токен есть то переходим в свайпы
        // Иначе в форму авторизации
        if (!!token) {
            history.push(ROUTES.collegues);
        } else {
            history.push(ROUTES.authorization);
        }

        return;
    }, [Device, dispatch, IosUtils.checkBrow])

    useEffect(() => {
        checkInfo();
    }, [])

    return (
        <Loading />
    )
}