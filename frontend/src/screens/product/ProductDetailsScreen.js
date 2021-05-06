import React, { useState, useEffect } from 'react'
import { useDispatch, connect, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { Row, Col, Breadcrumb, Tag, Button, Typography, notification, Spin } from 'antd'
import { CheckCircleOutlined, TagsOutlined, ShoppingCartOutlined } from '@ant-design/icons'

import { getTwoDecimalOfPrice, getAfterPayPrice, formatMoney } from '../../utils/productUtils'
import { fetchProduct } from '../../redux/actions/productActions'

import { addToCart, cartClearError } from '../../redux/actions/cartActions'
import Helmet from 'react-helmet'

const ProductDetailsScreen = (props) => {
    const { match: { params: { slug } } } = props
    const { history } = props
    const dispatch = useDispatch()
    const { Title } = Typography

    const productstore = useSelector((state) => state.product)
    const { product, loading } = productstore

    useEffect(() => {
        const fetchAPI = async () => {
            dispatch(fetchProduct(slug))
        };
        fetchAPI();
    }, []);

    const [, setAddToCartError] = useState([])
    useEffect(() => {
        setAddToCartError(props.cart.error)
        if (props.cart.error === 'Item already in cart') {
            showItemInCartNotification()
            dispatch(cartClearError())
        }
    }, [props.cart.error]);

    const handleAddItemToCart = (productId) => {
        dispatch(addToCart(productId))
    }

    const showItemInCartNotification = () => {
        openNotificationWithIcon('warning', 'Didn\'t add item', 'Item already in your cart')
    }

    const btn = (
        <Button type="primary" size="small" onClick={() => handleViewCartClick()}>
            View your cart
        </Button>
    )

    const openNotificationWithIcon = (
        type = 'success',
        message = 'Notification',
        description = 'Description'
    ) => {
        notification[type]({
            message,
            description,
            btn
        })
    }

    const handleViewCartClick = () => {
        history.push(`/cart/`)
    }
    return (
        <div>
            {
                loading ?
                    <div className="ProductDetailsScreen-Spinner">
                        <Spin size="large" style={{ width: "100px" }} />
                    </div>
                    : (product &&
                        <>
                            <Helmet>
                                <title>Cumba Bikes - {product?.name ? product?.name : ''}</title>
                            </Helmet>
                            <Row justify="center" >
                                <Col span={20} xs={24} sm={24} md={20} lg={20}>
                                    <Breadcrumb className="Product-details-breadcrumb">
                                        <Breadcrumb.Item>
                                            <Link to="/">
                                                Home
                                            </Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item href="">
                                            <span>
                                                {product.category && product.category.name}
                                            </span>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            {product && product.name}
                                        </Breadcrumb.Item>
                                    </Breadcrumb>
                                </Col>
                            </Row>


                            <Row justify="center" gutter={3}>
                                <Col span={6} xs={24} sm={12} md={18} lg={13}>
                                    
                                    <Carousel autoPlay={true} infiniteLoop={true} showArrows={true} style={{ width: '20%' }}>
                                        { product.images && product.images.map(item => (
                                            <div className="ProductDetailsScreen-Zoom-OnHover" key={item.id}>
                                                <img src={item && item.image_url} width="20%" />
                                                <p>{item && item.image.image_url}</p>
                                                <p className="legend"></p>
                                            </div>
                                        ))}
                                        
                                    </Carousel>
                                </Col>
                                
                                <Col span={6} offset={1} xs={24} sm={12} md={8} lg={6}>
                                    <div

                                        style={{
                                            height: "100%", border: "1px dotted #000",
                                            textAlign: "center", padding: "70px 20px"
                                        }}>
                                        <Title level={2}>
                                            {product.name}
                                        </Title>
                                        <p>
                                            <TagsOutlined /> &nbsp;
                                            {product.price && formatMoney(getTwoDecimalOfPrice(product.price))}
                                        </p>
                                        <p>
                                            or 4 payments of {product.price && formatMoney(getAfterPayPrice(product.price))} with &nbsp;
                                            <Tag icon={<CheckCircleOutlined />} color="success">
                                                afterPay
                                            </Tag>
                                        </p>
                                        <br />
                                        <br />
                                        <div>
                                            <h3 style={{ textAlign: 'start' }}>
                                                Description:
                                            </h3>
                                            <p style={{ textAlign: 'start' }}>
                                                {product.description}
                                            </p>
                                        </div>
                                        <Button
                                            type="primary"
                                            onClick={() => { handleAddItemToCart(slug) }}
                                            icon={<ShoppingCartOutlined />}
                                            style={{ marginTop: "50px" }}
                                            size="large" >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </>)
            }
        </div>
    )
}

ProductDetailsScreen.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    cart: state.cart
})

export default withRouter(connect(mapStateToProps, {})(ProductDetailsScreen))