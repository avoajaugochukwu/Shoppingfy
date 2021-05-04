import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'antd';

import ProductCard from './ProductCard'

import 'semantic-ui-css/semantic.min.css'

/* 
    This page is an intermediary between HomeScreen and ProductCard, 
    because a different UI Component library - Semantic UI will be 
    used to display the product cards. 

    And we intend to use ant design for the grid of the product cards.

    The rest of the app will use Ant Design UI
*/

const ProductCardWrapper = (props) => {

    const { products } = props


    return (
        <div>
            {products &&
                <Row gutter={10}>
                    {products && products?.map(item => (
                        <Col xs={24} sm={12} md={8} lg={8} key={item.id}>
                            <ProductCard product={item} key={item.id} />
                        </Col>
                    ))}
                </Row>
            }
            
        </div>
    )
}

ProductCardWrapper.propTypes = {
    products: PropTypes.array.isRequired,
};

ProductCardWrapper.defaultProps = {
    products: [],
};

export default ProductCardWrapper