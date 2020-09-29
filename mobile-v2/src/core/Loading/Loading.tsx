import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import "./style.scss";
export const Loading = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

    return (
        <div className="loading">
            <Spin indicator={antIcon} size="large" />
        </div>
    )
}