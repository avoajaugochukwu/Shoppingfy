import { fetchProduct } from '../../api'

import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM, CART_CLEAR_ERROR } from '../reducers/cartReducers'

export const addToCart = (productId) => async (dispatch, getState) => {
    const { cart: { cartItems } } = getState()

    console.log(cartItems)
    try {
        const product = await fetchProduct(productId)

        // Check if item already in cart before dispatching
        if (isProductInCart(cartItems, product.id)) {
            // Raise alert 'product in cart, we have increased the quantity'
            dispatch({
                type: CART_ADD_ITEM_FAIL,
                error: 'Item already in cart'
            })
            return false
        }

        dispatch({
            type: CART_ADD_ITEM,
            payload: product
        })
        
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    } catch (error) {
        dispatch({
            type: CART_ADD_ITEM_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,

        })
        console.log(error)
    }
}




const isProductInCart = (cartItems, productId) => {
    // console.log(cartItems[0].id)
    // console.log(cartItems)
    if (cartItems.length === 0) {
        return false
    }

    const cartProductIds = cartItems.map(items => items.id)
    
    if (cartProductIds.includes(productId)) {
        return true
    }

    return false
}

export const cartClearError = () => async (dispatch) => {
    dispatch({
        type: CART_CLEAR_ERROR,
        payload: ''
    })
}


export const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}