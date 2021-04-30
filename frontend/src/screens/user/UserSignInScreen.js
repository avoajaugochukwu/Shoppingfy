import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Row, Col, Button, Form, Input, Checkbox } from 'antd'

import { signIn } from '../../redux/actions/userActions'

import './UserSignInScreen.css'

const UserSignInScreen = (props) => {
    const user = useSelector((state) => state.user)
    const { userInfo: { username } } = user

    // When this screen is rerendering,
    // Check if username is now available.
    // That means, user has signed in... then redirect to cart
    useEffect(() => {
        if (username) {
            props.history.push('/cart/');
        }
    }, [username]);
    

    const [form] = Form.useForm()

    const onFinish = (values) => {
        handleUserSignIn(values)
    }

    const onReset = () => {
        form.resetFields()
    }

    const onFill = () => {
        form.setFieldsValue({
            username: 'demo', //Update later
            password: 'demo', //Update later
        })
    }

    const dispatch = useDispatch()
    const handleUserSignIn = (values) => {
        const { email, password } = values
        dispatch(signIn(email, password))
    }

    return (

        <div>
            <Row justify="center">
                <Col span={20} xs={24} sm={24} md={8} lg={8}
                    className="UserSignInScreen-Wrapper">
                    <h1>Log into your account</h1>
                    <Form form={form} name="control-hooks" onFinish={onFinish}>
                        <Form.Item name="email" label="Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" rules={[{ type: 'email', required: true, message: 'Please enter a valid email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Sign In
                            </Button>
                            &nbsp;&nbsp;
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                            <Button type="link" htmlType="button" onClick={onFill}>
                                Use default log in
                            </Button>
                        </Form.Item>
                    </Form>
                    <p>New customer? <b><Link to="/signup">Create your account</Link></b></p>
                </Col>
            </Row>
        </div>
    )
}


UserSignInScreen.propTypes = {
    history: PropTypes.object.isRequired,
};

export default UserSignInScreen