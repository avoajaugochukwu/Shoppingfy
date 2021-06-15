import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Row, Col, Button, Typography, Avatar } from 'antd'
import { TagsOutlined } from '@ant-design/icons'
import PayPalButton from './PaypalButton'

import { getTwoDecimalOfPrice } from '../../utils/productUtils'
import { getCartTotalAmount } from '../../utils/cartUtils'

import AddressWrapper from './AddressWrapper'
import Footer from '../../components/footer/Footer'

import './CheckOutScreen.css'

const { Title } = Typography;

const CheckoutScreen = () => {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart
  const totalPrice = getCartTotalAmount(cartItems)

  console.log(cartItems)
  return (
    <>
      <Row justify="center" gutter={16} style={{ margin: '1px' }}>
          <div>
          <Title style={{ textAlign: "left", margin: "20px" }}>Order Details</Title>
        </div>        
      </Row>

      <Row justify="center" gutter={16} style={{ margin: '1px' }}>
        <Col xs={24} sm={12} md={12} lg={10}>
          <div>
            <AddressWrapper />
          </div>
          {cartItems.length > 0 ? cartItems.map(product => (
            <div className="CheckOutScreen-Product-Wrapper" key={product.id}>
              <div className="CheckOutScreen-Product CheckOutScreen-Product-Box1">

                <Avatar
                  shape="square"
                  size={64}
                  src={product.images && product.images[0].image_url} />
              </div>
              <div className="CheckOutScreen-Product CheckOutScreen-Product-Box2">
                <h4>{product.name}</h4>
              </div>
              <div className="CheckOutScreen-Product CheckOutScreen-Product-Box3">
                ${getTwoDecimalOfPrice(product.price)} <TagsOutlined />
              </div>
              <div className="CheckOutScreen-Product CheckOutScreen-Product-Box4">
              </div>
            </div>
          ))
            :
            <h1 style={{ marginTop: "30px" }}>No item in your cart, please visit our product page</h1>}

        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className="CheckOutScreen-Summary-Wrapper">
            <Link to="/cart/">
              Back to cart?
                        </Link>
            <Title level={1}>Summary</Title>

          
            <div className="">
              <div className="CheckOutScreen-Summary-Amount">
                <p>Original price:</p>
                <p>${totalPrice}</p>
              </div>
              <div className="CheckOutScreen-Summary-Amount">
                <p>Coupon discounts:</p>
                <p>- &nbsp;$0.00</p>
              </div>
              <hr style={{ marginTop: "-5px", marginBottom: "5px" }} />
              <div className="CheckOutScreen-Summary-Amount">
                <h3>Total:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div>
                <p style={{ fontSize: "80%", marginTop: "20px", marginBottom: "20px" }}>
                  Shop is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.
                                    By completing your purchase you agree to these <a>Terms of Service.</a>
                </p>
              </div>
            </div>
            {
              totalPrice > 0 ?
                <div>
                  <PayPalButton />
                </div>
                :
                <Button type="dashed" block><Link to="/">Continue shopping</Link></Button>
            }
          </div>
        </Col>
      </Row>
      <div style={{ marginTop: "40px" }}>

      </div>
      <Footer />
    </>
  )
}

export default CheckoutScreen