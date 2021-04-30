import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAddressList } from '../../redux/actions/checkOutActions'

import AddressOthers from './AddressOthers'
import {SyncOutlined} from '@ant-design/icons'

const AddressList = () => {
    
    const user = useSelector((state) => state.user)
    const { userInfo: { id } } = user

    const checkOut = useSelector((state) => state.checkOut)
    const { addressList, addressUpdate } = checkOut

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAPI = async () => {
            dispatch(getAddressList(id))
        }
        fetchAPI()
    }, [addressList.length, addressUpdate])

    return (
        <>
            {addressList && addressList.length > 0 ?
                addressList.map(address => {
                    if (address.current === true) {
                        return (
                            <div className="AddressList-Current" key={address.id}>
                                <div>
                                    <p style={{ margin: "0px" }}><b>{address.user.username}</b></p>
                                    <p style={{ margin: "0px" }}>{address.address}</p>
                                    <p style={{ margin: "0px" }}>{address.city}, {address.state} State</p>
                                    <p style={{ marginBottom: "10px" }}>{address.phone}</p>
                                </div>
                            </div>
                            
                        )
                    }
                })
                :
                <>
                    <h1 style={{ textAlign: "center", marginTop: "250px", color: "blue" }}>Loading
                        <br/><SyncOutlined spin />
                    </h1>
                    <p>You don&apos;t have a shipping address. <a>Add an address</a></p>
                </>
                
            }

            <AddressOthers addressList={addressList} />
        </>
    )
}

export default AddressList