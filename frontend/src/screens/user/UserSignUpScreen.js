import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Row, Col, Button, Form, Input } from 'antd'

import { register } from '../../redux/actions/userActions'
import { validateEmail } from '../../utils/userUtils'

import './UserSignInScreen.css'

const UserSignUpScreen = (props) => {
    const user = useSelector((state) => state.user)
    const { userInfo: { username }, error } = user

    // When this screen is rerendering,
    // Check if username is now available.
    // That means, user has signed registered... then redirect to cart
    useEffect(() => {
        if (username) {
            props.history.push('/cart/');
        }
    }, [username]);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        handleUserSignUp(values)

    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const dispatch = useDispatch()
    const handleUserSignUp = (values) => {
        const { username, email, password1, password2 } = values
        if (password1 === password2 && validateEmail(email) === true && username !== '') {
            dispatch(register(username, email, password1, password2))
            // console.log(values);
        } else {
            console.log('Validation failed')
        }
    }

    return (

        <div>
            <Row justify="center">
                <Col span={20} xs={24} sm={24} md={8} lg={8}
                    className="UserSignInScreen-Wrapper">
                    <h1>Log into your account</h1>
                    {/* {loading && <LoadingBox></LoadingBox>} */}

                    <Form form={form} name="control-hooks" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>
                        <small>{error && error.username ? error.username : ''}</small>
                        {/* <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true, message: 'Please enter an email' }]}> */}
                        <Form.Item name='email' label="Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" rules={[{ type: 'email', required: true, message: 'Please enter a valid email' }]}>
                            <Input />
                        </Form.Item>
                        <small>{error && error.email ? error.email : ''}</small>
                        <Form.Item label="Password" name="password1" rules={[{ required: true, message: 'Please enter a password' }]}>
                            <Input.Password />
                        </Form.Item>
                        <small>{error && error.password1 ? error.password1 : ''}</small>
                        <Form.Item label="Password" name="password2" rules={[{ required: true, message: 'Please enter a matching password' }]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <p>Have and account? <b><Link to="/signin">Click to login</Link></b></p>
                </Col>
            </Row>
        </div>
    )
}


UserSignUpScreen.propTypes = {
    history: PropTypes.object.isRequired,
};


export default UserSignUpScreen