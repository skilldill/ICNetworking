import React, { FC } from "react";

import "./style.scss";
import { Input } from "shared/components";

export const InterestsField: FC = (props) => {
    return (
        <div className="interests-field">
            <h3>Мои интересы</h3>
            <Input placeholder="Введите интересы" />
        </div>
    )
}