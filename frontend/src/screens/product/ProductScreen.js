
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Spin } from 'antd'

import ProductCardWrapper from './ProductCardWrapper'

import { fetchAllProducts } from '../../redux/actions/productActions'


import Footer from '../../components/footer/Footer'

import './ProductScreen.css'

import Helmet from 'react-helmet'

const ProductScreen = () => {

    // const { history } = props

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAPI = async () => {
            dispatch(fetchAllProducts)
        }
        fetchAPI()
    }, [])

    const error = useSelector((state) => state.error)
    const { dbError } = error

    const product = useSelector((state) => state.product)
    const { products } = product

    setTimeout(() => {
        if (dbError) {

            return <Redirect to='/500' />
        }    
    }, 3000)
    

    // If products array is still empty after 10 seconds, move to maintenance page
    // console.log(products?.length)
    // setTimeout(
    //     () => {
    //         console.log(products?.length)
    //         if (products?.length === 0 || products?.length === undefined) {
    //             history.push('/500')
                
    //         }
    //     }, 1000);

    return (
        <div>
            <Helmet>
                <title>Cumba Bikes</title>
            </Helmet>
            <div className="ProductScreen-Jumbotron">
                <div className="ProductScreen-Jumbotron-Image-Overlay">
                    <div className="ProductScreen-Jumbotron-Text">
                        <h1>Train, Cycle, Recover - Repeat</h1>
                        <p>Home of quality bicycles and accessories</p>
                    </div>
                </div>

            </div>
            <div className="ProductScreen-Wrapper">
                {
                    products?.length > 0 ? <ProductCardWrapper products={products} errors={products} />
                    :
                    <div className="ProductScreen-Spinner">
                        <Spin size="large" style={{width:"100px"}} />
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}

ProductScreen.propTypes = {
    history: PropTypes.object.isRequired,
};
export default ProductScreen