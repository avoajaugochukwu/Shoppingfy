import axios from 'axios'
import { getUserInfo } from '../../utils/userUtils'

import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
        USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_SIGNOUT } from '../reducers/userReducers'

import { baseUrl } from '../consts'

export const signIn = (email, password) => async (dispatch) => {
    // Think about removing USER_SIGNIN_REQUEST
    dispatch({ 
        type: USER_SIGNIN_REQUEST
    })
    const url = baseUrl + 'dj-rest-auth/login/'
    try {
        const response = await axios.post(url, {
            "email": email,
            "password": password
        })

        const userInfo = getUserInfo(response)

        dispatch({ 
            type: USER_SIGNIN_SUCCESS, 
            payload: userInfo
        })
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            // payload: 'Username or password is incorrect'
            payload: error.response.data
        })
        // console.log(error.response.data)
    }
}

export const register = (username, email, password1, password2) => async (dispatch) => {
    const url = baseUrl + 'dj-rest-auth/registration/'
    try {
        const response = await axios.post(url, {
            "username": username, 
            "email": email, 
            "password1": password1, 
            "password2": password2
        })
        
        const userInfo = getUserInfo(response)

        dispatch({ 
            type: USER_REGISTER_SUCCESS, 
            payload: userInfo
        })
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        console.log(response.data)
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data
        })
        // console.log(error)
        console.log(error.response.data)
    }
}

export const signOut = () => (dispatch) => {
    // API for logout
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cart')
    dispatch({
        type: USER_SIGNOUT
    })
    // document.location.href = "/"
}