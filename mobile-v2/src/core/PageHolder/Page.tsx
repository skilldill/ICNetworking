import React, { FC } from "react"
import "./style.scss";

export const Page: FC = (props) => {
    const { children } = props;
    return <div className="page">{children}</div>
}