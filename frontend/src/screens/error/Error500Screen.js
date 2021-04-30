import React from 'react';
import { Result, Button } from 'antd';


const Error500 = () => {
    return (
        <Result
            status="500"
            title="500"
            subTitle="Sorry, this site is under maintenance. Please check back later"
            extra={<Button type="primary">Back Home</Button>}
        />
    )
}

export default Error500