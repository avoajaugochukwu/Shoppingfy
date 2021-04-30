export const ADDRESS_ADD = 'ADDRESS_ADD'
export const ADDRESS_REMOVE = 'ADDRESS_REMOVE'
export const ADDRESS_LIST = 'ADDRESS_LIST'
export const ADDRESS_UPDATE = 'ADDRESS_UPDATE'

const initialState = {
    addressList: {},
    addressUpdate: false
}

export const checkOutReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDRESS_ADD:
            return {
                ...state,
                addressList: [...state.addressList, action.payload]
            }
        case ADDRESS_LIST:
            return {
                ...state,
                addressList: action.payload
            }
        case ADDRESS_UPDATE:
            return {
                ...state,
                addressList: [...state.addressList, action.payload],
                addressUpdate: !state.addressUpdate
            }
        default:
            return state
    }
}

// Do not use redux for Address
// Address is only available for loggedIn user. 
// That means when user is logged in we can fetch their addresses
// Also add new column in address to relect current address