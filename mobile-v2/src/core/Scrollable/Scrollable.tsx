import React, { FC } from "react";
import "./style.scss";

export const Scrollable: FC = (props) => {
    const { children } = props;
    
    return (
        <div className="scrollable">
            { children }
        </div>
    )
}  