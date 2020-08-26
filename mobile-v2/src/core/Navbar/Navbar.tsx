import React, { FC } from "react";
import "./style.scss";

interface NavbarProps {
    title: string,
    options?: any,
    onClickBack?: () => void,
    onCancel?: () => void
}

export const Navbar: FC<NavbarProps> = (props) => {
    const { title, options, onClickBack, onCancel } = props;

    return (
        <div className="navbar">
            <div></div>
            <h3>{title}</h3>
            <div></div>
        </div>
    )
}