import React, { useMemo } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import "./style.scss";

export const LoadingPage = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
    
    return (
        <div className="loading-page">
            <Spin indicator={antIcon} size="large" />
        </div>
    )
}