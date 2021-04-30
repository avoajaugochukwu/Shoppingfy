import axios from 'axios'

import { ADDRESS_ADD, ADDRESS_LIST } from '../reducers/checkOutReducer'
import { baseUrl } from '../consts'

export const addAddress = (token, id, values) => async (dispatch) => {
    
    const url = baseUrl + 'address/'

    const { address, state, city, phone } = values

    try {
        const response = await axios.post(url, {
            "user": id,
            "address": address,
            "city": city,
            "phone": phone,
            "state": state,
            "current": true
        })
        
        dispatch({
            type: ADDRESS_ADD,
            payload: response.data
        })
    } catch (error) {
        console.log(error.response.data)
    }
}


export const getAddressList = (userId) => async (dispatch) => {

    const url = baseUrl + `user_address?user=${userId}`
    
    try {
        const addressList = await axios.get(url)
        
        dispatch({
            type: ADDRESS_LIST,
            payload: addressList.data
        })
        // console.log(addresses)
        // localStorage.setItem('addresses', JSON.stringify(getState().checkOut.addresses))
    } catch (error) {
        console.log(error.response.data)
    }
}


export const changeAddressToCurrent = (addressId, userId) => async (dispatch) => {
    const url = baseUrl + `address/${addressId}/`

    console.log(addressId, userId)

    try {
        const addressUpdate = await axios.patch(url, {
            "user": userId,
            "address": addressId,
            "current": true
        })

        dispatch({
            type: ADDRESS_LIST,
            payload: addressUpdate.data
        })
        
    } catch (error) {
        console.log(error)
    }
}