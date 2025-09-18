import React from 'react'
import "../componentStyles/NoProducts.css"

const NoProduct = ({keyword}) => {
  return (
    <div className='no-products-content'>
        <div className="no-product-icon"></div>
        <h3 className="no-product-title">No products found</h3>

        <p className="no-product-message">
            {keyword?` We couldnot find any products matching ${keyword}, Try using different keyword or browse our complete catalog  `:` No products currently available. Please check back later.`}
        </p>
      
    </div>
  )
}

export default NoProduct
