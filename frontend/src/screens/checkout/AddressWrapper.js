import React, { useState } from 'react'
import { Modal, Button } from 'antd'

import AddressList from './AddressList'
import AddressForm from './AddressForm'



const AddressWrapper = () => {


    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)

    const showModal = () => {
        setVisible(true)
    };

    const handleCancel = () => {
        setVisible(false)
    };

    const handleSubmit = () => {
        setLoading(true)
        setTimeout(() => {
            // setLoading(loading => false)
            // setVisible(visible => false)
            setLoading(false)
            setVisible(false)
        }
            , 3000)
    };

    return (
        <>
            <div className="AddressWrapper-Wrapper">
                <div className="AddressWrapper-Header">
                    <h4 style={{ marginTop: "auto", marginBottom: "auto" }}>Address</h4>

                    {/* <Button type="primary" size="small" >
                                Add Address
                            </Button> */}
                    <Button type="primary" onClick={() => showModal()} size="small">
                        Add Address
                    </Button>
                </div>
                <div className="AddressWrapper-Body">
                    <AddressList />                
                </div>
            </div>

            <Modal
                visible={visible}
                title="Please add delivery address"
                // onOk={() => handleCancel()}
                onCancel={() => handleCancel()}
                footer={null}
            >

                <AddressForm handleSubmit={handleSubmit} loading={loading} />
            </Modal>
        </>
    );
}

export default AddressWrapper