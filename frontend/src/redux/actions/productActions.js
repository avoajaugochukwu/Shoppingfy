import axios from 'axios'
import { getErrorType, createErrorObject } from '../../utils/errorUtils'

import { PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST } from '../reducers/productReducer'
import { GET_ERROR, NETWORK_ERROR } from '../reducers/errorReducer'
import { baseUrl } from '../consts'


export const fetchAllProducts = async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })

    const url = baseUrl + 'products/'
    console.log(url)

    axios
        .get(url)
        .then(res => {
            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: res.data
            })
        })
        .catch(error => {
            const errorType = getErrorType(error)
            if (errorType === 'NETWORK_ERROR') {
                console.error('Database cannot be reached')
                dispatch({
                    type: NETWORK_ERROR
                })
                return
            }

            const errors = createErrorObject(error)
            dispatch({
                type: GET_ERROR,
                payload: errors
            })
        })
}


export const fetchProduct = (productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST
    })

    const url = baseUrl + `products/${productId}`
    
    axios
        .get(url)
        .then(res => {
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: res.data
            })
        })
        .catch(error => {
            const errors = createErrorObject(error)
            console.error(error)
            console.log(url)
            dispatch({
                type: GET_ERROR,
                payload: errors
            })
        })
}