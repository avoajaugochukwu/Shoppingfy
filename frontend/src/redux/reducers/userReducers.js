// user Registration
export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST'
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS'
export const USER_SIGNIN_FAIL = 'USER_SIGNIN_FAIL'
export const USER_SIGNOUT = 'USER_SIGNOUT'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL'

const initialState = {
    userInfo: {},
    loading: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_SIGNIN_SUCCESS:
            // console.log(action.payload)
            return {
                ...state,
                loading: false,
                userInfo: action.payload,
                error: undefined
            }
        case USER_SIGNIN_FAIL:
            console.log(action.payload)
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case USER_SIGNOUT:
            return initialState
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                // This should not have a payload, because it can expose the 
                // user password
                userInfo: action.payload,
                error: undefined
            }
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

