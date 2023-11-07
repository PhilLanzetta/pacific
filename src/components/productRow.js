import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import useStore from '../context/StoreContext'

const ProductRow = ({ item }) => {
  const { product, quantity } = item

  const { removeLineItem, lowerCartItemQuantity, addCartItemQuantity } =
    useStore()

  return (
    <section className="product-row-container">
      <GatsbyImage
        image={product.featuredImage.localFile.childImageSharp.gatsbyImageData}
        className='product-row-image'
      ></GatsbyImage>
      <article className='product-row-info'>
        <p>
          <span>{product.title}</span>
        </p>
        <article className='product-row-quantity'>
          <p>Quantity {quantity}</p>
          <button
            className='quantity-btn'
            onClick={() =>
              lowerCartItemQuantity(product.variants[0]?.shopifyId)
            }
            disabled={quantity === 1}
          >
            -
          </button>
          <button
            onClick={() => addCartItemQuantity(product.variants[0]?.shopifyId)}
            className='quantity-btn'
          >
            +
          </button>
        </article>
        <button
          onClick={() => removeLineItem(product.variants[0]?.shopifyId)}
          className='cart-remove'
        >
          Remove from cart
        </button>
      </article>
      <p>
        <span>{`$${
          product.priceRangeV2.minVariantPrice.amount * quantity
        }`}</span>
      </p>
    </section>
  )
}

export default ProductRow
