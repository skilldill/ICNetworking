import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import "./style.scss";

const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin color="#ffffff" />;

export const Loading = () => {
    return (
        <div className="backdrop">
            <div className="loading">
                <Spin indicator={loadIcon} size="large" />
            </div>
        </div>
    )
}