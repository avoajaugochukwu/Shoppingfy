import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Row, Col, Input } from 'antd';

import FooterMenu from './FooterMenu'

import logo from '../../img/logo.png'

import './Footer.css'

const { Search } = Input


const Footer = () => {
    const [couponError, setCouponError] = useState(false);

    const handleOnClick = () => {
        setCouponError(!couponError)
        setTimeout(() => {
            setCouponError(couponError => !couponError)
        }
            , 3000)
    }

    return (
        <div className="Footer-Main">
            
            <Row gutter={10} style={{ textAlign: "center" }}>
                <Col xs={24} sm={12} md={8} lg={6} className="Footer-Col-4-Wrapper">
                    <div className="Footer-Col-4-Wrapper-Inner" style={{ textAlign: 'center' }}>
                        <div className="Footer-Logo-Wrapper">
                            <Link to='/'>
                                <img className="Footer-Logo" src={logo} />
                            </Link>
                        </div>
                        <div className="Footer-Contact-Details">
                            <p>Best bike shop in Nigeria</p>
                            <p>hello@cumbabikes.com</p>
                            <p>+234 908 985 0000</p>
                            <p>+234 908 986 0000</p>
                        </div>

                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} className="Footer-Col-4-Wrapper">
                    <div className="Footer-Col-4-Wrapper-Inner">
                        <h3>Find us</h3>
                        <p>Bode Thomas
                    <br />Surulere, Lagos</p>
                        <h3>Hours</h3>
                        <p>Monday–Saturday: 9:00AM–5:00PM</p>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} className="Footer-Col-4-Wrapper">
                    <div className="Footer-Col-4-Wrapper-Inner">
                        <p>FAQ</p>
                        <p>Blog</p>
                        <p>Privacy Policy</p>
                        <p>Term & Conditions</p>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} className="Footer-Col-4-Wrapper">
                    <div className="Footer-Col-4-Wrapper-Inner" style={{ marginBottom: "50px" }}>
                        <h3>Join our newsletter</h3>
                        <p>Signup to be the first to hear about exclusive deals, special offers and upcoming collections</p>
                        <Search
                            placeholder="Please enter your email"
                            allowClear
                            enterButton="Submit"
                            size="large"
                            onSearch={handleOnClick}
                            
                        />
                        <div>
                            {
                                couponError ?
                                    'Your email has been submitted'
                                    :
                                    ''
                            }
                        </div>
                    </div>
                </Col>
            </Row>
            <FooterMenu />
        </div>
    )
}

export default Footer