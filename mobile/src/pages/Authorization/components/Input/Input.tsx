import React, { useMemo, useCallback } from "react";
import cn from "classnames";

import "./style.scss";
import { InputProps } from "./Input.model";

export const Input: React.FC<InputProps> = (props) => {
    const { placeholder="", type="text", bottomBorder, onChange, value } = props;
    const classes = useMemo(() => cn({
        'input-control': true,
        'input-control-border': !!bottomBorder
    }), [bottomBorder])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        !!onChange && onChange(event.currentTarget.value);
    }, [onChange])

    return (
        <div className={classes}>
            <input 
                type={type} 
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
            />
        </div>
    )
}