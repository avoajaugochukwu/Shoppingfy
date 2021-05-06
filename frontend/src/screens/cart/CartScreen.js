import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { Row, Col, Tag, Button, Typography, Avatar } from 'antd'
import { CheckCircleOutlined, TagsOutlined } from '@ant-design/icons'

import { removeFromCart } from '../../redux/actions/cartActions'
import { getAfterPayPrice, formatMoney } from '../../utils/productUtils'
import { getCartTotalAmount } from '../../utils/cartUtils'

import CouponCode from './CouponCode'
import './CartScreen.css'

const { Title } = Typography;

const CartScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart
    const numberOfItemsInCart = cart.cartItems.length
    const totalPrice = getCartTotalAmount(cartItems)
    const dispatch = useDispatch()
    // console.log(cartItems)


    const handleRemoveItemFromCart = (productId) => {
        dispatch(removeFromCart(productId))
    }
    
    return (
        <div>

            <Row justify="center" className="CartScreen-Jumbotron">
                <Col xs={24} sm={12} md={12} lg={15} style={{ paddingLeft: '5px' }}>
                    <h1>Shopping cart</h1>

                </Col>
            </Row>

            <Row justify="center">
                <Col xs={24} sm={12} md={12} lg={15} style={{ paddingLeft: '5px' }}>
                    <p style={{marginBottom: "10px"}}>{numberOfItemsInCart} item(s) in your shopping cart</p>
                </Col>
            </Row>


            <Row justify="center" gutter={16} style={{ margin: '1px' }}>
                <Col xs={24} sm={12} md={12} lg={12}>
                    {cartItems.length > 0 ? cartItems.map(product => (
                        <div className="CartScreen-Product-Wrapper" key={product.id}>
                            <div className="CartScreen-Product CartScreen-Product-Box1">
                                {/* <img src={product.images && product.images[1].image.full_size} width="10%" /> */}
                                <Avatar
                                    shape="square"
                                    // size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                    size={100}
                                    src={product.images && product.images[0].image_url} />
                            </div>
                            <div className="CartScreen-Product CartScreen-Product-Box2">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p><i>Brought to you by: {product.seller.company_name}</i></p>
                            </div>
                            <div className="CartScreen-Product CartScreen-Product-Box3">
                                {formatMoney(product.price)} <TagsOutlined />
                            </div>
                            <div className="CartScreen-Product CartScreen-Product-Box4">

                                {/* <RestOutlined style={{color: "#ff4d4f", fontSize: '1.5em'}} /> */}
                                <Button type="link" danger onClick={() => handleRemoveItemFromCart(product.id)}>
                                    Remove
                            </Button>
                            </div>
                        </div>
                    )) 
                    :
                    <h1 style={{marginTop: "30px"}}>No item in your cart, please visit our product page</h1>}
                    
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                    <p >Total:</p>
                    <Title level={1}>{formatMoney(totalPrice)}</Title>
                    {
                        totalPrice > 0 ?
                        <div>
                            <p>
                                or 4 payments of {formatMoney(getAfterPayPrice(totalPrice))} with &nbsp;
                                <Tag icon={<CheckCircleOutlined />} color="success">
                                    afterPay
                                </Tag>
                            </p>
                            <Button type="primary" size="large" block>
                                <Link to="/checkout/">
                                    Proceed to checkout
                                </Link>
                            </Button>
                            <br /><br />
                            <Button type="dashed" block><Link to="/">Continue shopping</Link></Button>
                            <CouponCode />
                        </div>
                    :
                        <Button type="dashed" block><Link to="/">Continue shopping</Link></Button>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen