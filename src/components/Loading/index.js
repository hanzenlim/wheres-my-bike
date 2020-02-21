import React from 'react';
import { Icon } from 'antd';
import SuperDiv from '../SuperDiv';

function Loading() {
    return (
        <SuperDiv
            width="30px"
            margin="30px auto"
            height="100vh"
            fontSize="60px"
        >
            <Icon type="loading" />
        </SuperDiv>
    );
}

export default Loading;
