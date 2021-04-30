export const GET_ERROR = 'GET_ERROR'
export const NETWORK_ERROR = 'NETWORK_ERROR'


const initialState = {
    message: {},
    status: null,
    dbError: null,
}

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ERROR:
            return {
                message: action.payload.message,
                status: action.payload.status
            }
        case NETWORK_ERROR:
            return {
                message: {'error': 'Network Error - Db is not connected'},
                status: 'Network Error',
                dbError: true
            }
        default:
            return state
    }
}