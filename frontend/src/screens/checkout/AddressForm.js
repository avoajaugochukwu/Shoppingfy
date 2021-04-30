import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Button, Select } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { addAddress } from '../../redux/actions/checkOutActions'

const { Option } = Select
const AddressForm = (props) => {

    const handleSubmit = props.handleSubmit
    const loading = props.loading

    const [form] = Form.useForm()
    const [, forceUpdate] = useState({})

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({})
    }, [])

    const user = useSelector((state) => state.user)
    const { userInfo: { username, id, token } } = user

    const dispatch = useDispatch()
    const onFinish = (values) => {
        // Argument: token, userid, and form values
        dispatch(addAddress(token, id, values))

    }

    return (
        <Form form={form} layout="" onFinish={onFinish} className="CheckOutScreen-Address-Form-Wrapper">
            <Form.Item
                name="username"
                initialValue={username}
                label="Customer name"
                rules={[{ required: true, message: 'Please input your usernam!' }]}
                className="CheckOutScreen-Address-Form"
            >
                <Input placeholder="username" />
            </Form.Item>

            <Form.Item
                name="phone"
                // initialValue={phone}
                label="Customer name"
                rules={[{ required: true, message: 'Please input your usernam!' }]}
                className="CheckOutScreen-Address-Form"
            >
                <Input placeholder="phone" />
            </Form.Item>
            {/* <Form.Item
                name="lastname"
                initialValue="Avoaja"
                label="Last name"
                rules={[{ required: true, message: 'Please input your lastname!' }]}
                className="CheckOutScreen-Address-Form"
            >
                <Input
                    
                    placeholder="lastname"
                />
            </Form.Item> */}

            <Form.Item 
                name="address" 
                label="Address"
                rules={[{ required: true }]}
                className="CheckOutScreen-Address-Form"
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item name="state" label="State" rules={[{ required: true }]}
                className="CheckOutScreen-Address-Form"
            >
                <Select
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    allowClear
                >
                    <Option value="Lagos">Lagos</Option>
                    <Option value="PortHarcout">PortHarcout</Option>
                    <Option value="Ibadan">Ibadan</Option>
                </Select>
            </Form.Item>
            <Form.Item name="city" label="City" rules={[{ required: true }]}
                className="CheckOutScreen-Address-Form"
            >
                <Select
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    allowClear
                >
                    <Option value="Surulere">Surulere</Option>
                    <Option value="Apapa">Apapa</Option>
                    <Option value="Ikeja">Ikeja</Option>
                </Select>
            </Form.Item>

            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={
                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                        onClick={() => handleSubmit()}
                        block
                    >
                        Log in
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

AddressForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};




export default AddressForm