import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { userReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import { checkOutReducer } from './reducers/checkOutReducer'
import { errorReducer } from './reducers/errorReducer'
import { productReducer } from './reducers/productReducer'


const initialState = {
    user: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : {},
    },
    cart : {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : {},
        paymentMethod: 'PayPal',
        error: ''
    },
    checkOut: {
        addressList: localStorage.getItem('addresses')
            ? JSON.parse(localStorage.getItem('addresses'))
            : [] ,
    },
}


const reducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    checkOut: checkOutReducer,
    error: errorReducer,
    product: productReducer,
})


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store
