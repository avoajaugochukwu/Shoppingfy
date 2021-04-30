import React from 'react'
import PropTypes from 'prop-types'
import { Card as SegmentUICard } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';


import './Product.css'

const ProductCard = (props) => {

    const { product, history } = props

    const handleClick = (slug) => {
        history.push(`product/${slug}`)
    }


    const extra = (
        <p>
            {product.quantity} people like this dress
        </p>
    )

    return (
        <div className="ProductCard-Card">
            <SegmentUICard
                key={product.id}
                onClick={() => { handleClick(product.slug) }}
                image={product.images[0].image.product_image}
                // image="https://dummyimage.com/325x360/000/fff"
                header={product.name}
                meta={product.category.name}
                // description={product.description}
                extra={extra}
                fluid={true}
            />
        </div>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

ProductCard.defaultProps = {
    product: {},
    history: {},
};

// export default ProductCard
const mapStateToProps = () => ({

})

// Higher Order Component - To enable us have access to properties of 'props' like history, location, 
export default withRouter(connect(mapStateToProps, {})(ProductCard))