import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Collapse } from 'antd'


import { changeAddressToCurrent } from '../../redux/actions/checkOutActions'


const { Panel } = Collapse


const AddressOthers = (props) => {
    const { addressList } = props

    const user = useSelector((state) => state.user)
    const { userInfo: { id } } = user
    const userId = id


    const dispatch = useDispatch()

    const changeToCurrent = (addressId) => {
        dispatch(changeAddressToCurrent(addressId, userId))
    }

    return (
        <div>
            {addressList && addressList.length > 1 ?
                <Collapse>
                    <Panel header="Your other address(es)">
                        {addressList.map(address => {
                            if (address.current !== true) {
                                return (
                                    <div key={address.id} className="AddressOthers-Wrapper">
                                        <div className="AddressOthers-Details">
                                            <p style={{ margin: "0px" }}><b>{address.user.username}</b></p>
                                            <p style={{ margin: "0px" }}>{address.address}</p>
                                            <p style={{ margin: "0px" }}>{address.city}, {address.state} State</p>
                                            <p style={{ marginBottom: "10px" }}>{address.phone}</p>
                                        </div>
                                        <div className="AddressOthers-Current">
                                            <Button 
                                                className="AddressOthers-Current-Button"
                                                type="primary" size="small"
                                                onClick={() => changeToCurrent(address.id)}>
                                                Set as current
                                            </Button>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </Panel>
                </Collapse>
                :
                ''
            }
        </div>
    )
}

AddressOthers.propTypes = {
    addressList: PropTypes.array.isRequired,
};

AddressOthers.defaultProps = {
    addressList: [],
};
export default AddressOthers