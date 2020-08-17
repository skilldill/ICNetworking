import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import "./style.scss";
import { Input } from "../../components";
import { ApiServise, updateTokenHttpClient } from "shared/api";

export const LoginForm = () => {
    const [login, setLogin] = useState("skilldill");
    const [password, setPassword] = useState("7543221");
    const history = useHistory();

    const authorization = useCallback(async () => {
        try {
            const response = await ApiServise.authorization(login, password);
            const { jwt, user } = response.data;

            localStorage.setItem("jwt", jwt);
            localStorage.setItem("uid", user.id);
            updateTokenHttpClient(jwt);

            history.push('/partners');
        } catch (error) {
            console.log(error);
        }
    }, [login, password, history]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!!login.length && !!password.length) {
            authorization()
        }
    } 

    return (
        <form className="form login-form" onSubmit={handleSubmit}>
            <h3 className="title">Вход</h3>
            <div className="controls-inputs">
                <Input 
                    placeholder="Почта" 
                    bottomBorder 
                    value={login}
                    onChange={setLogin}
                />
                <Input 
                    type="password" placeholder="Пароль"
                    value={password}
                    onChange={setPassword}
                />
            </div>
            <div>
                <button className="btn" type="submit">Войти</button>
            </div>
        </form>
    )
}