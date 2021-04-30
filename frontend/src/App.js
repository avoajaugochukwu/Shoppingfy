import { React } from "react";
import './App.css'
import 'antd/dist/antd.css'
import Header from './components/header/Header'

import ProductScreen from './screens/product/ProductScreen'
import CartScreen from './screens/cart/CartScreen'
import CheckoutScreen from './screens/checkout/CheckoutScreen'



import PrivateRoute from './components/PrivateRouter'
import UserSignInScreen from './screens/user/UserSignInScreen'
import UserSignUpScreen from './screens/user/UserSignUpScreen'
// import Order from './components/Order'
import ProductDetailsScreen from './screens/product/ProductDetailsScreen'

import Error500Screen from './screens/error/Error500Screen'


import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
  
      <Header />

        <Switch>
          {/* Home page is in ProductScreen */}
          <Route exact path="/" component={ProductScreen}></Route>
          <Route exact path="/signin" component={UserSignInScreen}></Route>
          <Route exact path="/signup" component={UserSignUpScreen}></Route>
          <Route exact path="/product/:slug" component={ProductDetailsScreen}></Route>
          <Route exact path="/cart/" component={CartScreen}></Route>
          <Route exact path="/500/" component={Error500Screen}></Route>
          {/* <Route exact path="/checkout/" component={CheckoutScreen}></Route> */}

          {/* <Route path="/order" component={Order}></Route> */}
          {/* <Route exact path="/" component={Cart}></Route> */}
          {/* <Route exact path="/details/:id" component={CartDetails}></Route> */}
          <PrivateRoute exact path="/checkout/" component={CheckoutScreen} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;

