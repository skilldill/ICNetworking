import React, { FC, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import cn from "classnames";

interface TabbarItemProps {
    to: string,
    name: string,
    icon: string,
    iconActive: string,
    isActive: boolean,
    onClick?: (to: string) => void
}

export const TabbarItem: FC<TabbarItemProps> = (props) => {
    const { to, name, icon, iconActive, isActive, onClick } = props;
    const history = useHistory();

    const handleClick = useCallback(() => {
        !!onClick && onClick(to);
        history.push(to);
    }, [onClick])

    const classes = useMemo(() => cn({
        "tabbar-item": true,
        "tabbar-item-active": isActive
    }), [isActive]);

    const currentIcon = useMemo(() => isActive ? iconActive : icon, [isActive]);

    return (
        <div className={classes} onClick={handleClick}>
            <div className="icon">
                <img src={currentIcon} alt={name} />
            </div>
            <small>{name}</small>
        </div>
    )
}