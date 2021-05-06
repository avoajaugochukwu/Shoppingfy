import React from 'react'
import { Row, Col } from 'antd'

import './Footer.css'

const FooterMenu = () => {
    const date = new Date()
    return (
        <>
            <Row gutter={10} justify="center" className="FooterMenu-Main">
                <Col xs={12} sm={12} md={8} lg={6} >
                    <p className="FooterMenu-Date">
                        Cumba Bikes &copy; {date.getFullYear()}
                    </p>
                </Col>
                <Col xs={12} sm={12} md={8} lg={15} >
                    <div className="FooterMenu-Right">
                        {/* <p>Terms</p> */}
                        <p>Cookie Policy</p>
                        <p>Privacy Policy</p>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={3} >

                </Col>
            </Row>
        </>
    )
}

export default FooterMenu