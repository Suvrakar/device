import React from 'react'

import { Spin } from 'antd';

const LoaderPage = () => {
    return (
        <div style={{justifyContent:'center',alignItems:'center',display:'flex', height:'100vh'}}>
            <Spin size="large" />
        </div>
    )
}

export default LoaderPage
