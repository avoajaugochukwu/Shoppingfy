import React, { useState } from 'react'
import { Typography } from 'antd';

import './CartScreen.css'

const CouponCode = () => {
    const [couponError, setCouponError] = useState(false);

    const handleOnClick = () => {
        setCouponError(!couponError)
        setTimeout(() => {
            setCouponError(couponError => !couponError)
        }
        , 3000)
    }

    const { Text } = Typography;

    return (
        <div className="" style={{textAlign: "center"}}>
            <div className="coupon-code-wrapper">
                <input
                    type="text"
                    className="coupon-code-input"
                    placeholder="Enter Coupon Code"
                />
                <button
                    className="coupon-code-btn"
                    onClick={() => handleOnClick()}>Apply</button>
            </div>
            <Text type="danger">
                {
                    couponError ? 
                    'Coupon Code is invalid!'
                    :
                    ''
                }
            </Text>
        </div>
    );
};

export default CouponCode