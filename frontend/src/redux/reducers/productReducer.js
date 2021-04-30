export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAILURE = 'PRODUCT_LIST_FAILURE'
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST'
export const PRODUCT_DETAILS_FAILURE = 'PRODUCT_DETAILS_FAILURE'

const initialState = {
    loading: false,
    products: [],
    product: {}
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                product: action.payload,
                loading: false
            }
        default:
            return state
    }
}
