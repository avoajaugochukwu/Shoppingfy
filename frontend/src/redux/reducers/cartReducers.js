export const CART_ADD_ITEM = 'CART_ADD_ITEM'
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'
export const CART_ADD_ITEM_FAIL = 'CART_ADD_ITEM_FAIL'
export const CART_CLEAR_ERROR = 'CART_CLEAR_ERROR'



export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            // console.log(state.cartItems)
            // SInce we are adding the result of the api call directly, we need to update the quantity 
            // cartItems.quantity = 1
            // And only increase it or reduce it when user clicks add or remove
            return { 
                ...state, 
                cartItems: [...state.cartItems, action.payload],     
                error: ''       
            }

        case CART_ADD_ITEM_FAIL:
            return {
                ...state,
                error: action.error
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.id !== action.payload),
                error: ''
            }

        case CART_CLEAR_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state
    }
}