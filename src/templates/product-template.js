import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import useWindowSize from '../utils/useWindowSize'
import useStore from '../context/StoreContext'

const ProductPage = ({ location, data }) => {
  const { width } = useWindowSize()
  const isMobile = width < 601
  const {
    media,
    title,
    metafields,
    descriptionHtml,
    priceRangeV2,
    totalInventory,
  } = data.shopifyProduct

  const desktopMedia = media.slice(1)

  const { addVariantToCart } = useStore()

  const tagline = metafields.filter(
    (metafield) => metafield.key === 'tagline'
  )[0]?.value

  const details = metafields.filter(
    (metafield) => metafield.key === 'details'
  )[0]?.value

  return (
    <Layout location={location}>
      <div className='product-page-container'>
        <div className='product-left'>
          {desktopMedia.map((image) => (
            <GatsbyImage
              key={image.id}
              image={image.image?.localFile?.childImageSharp?.gatsbyImageData}
              className='product-image'
            ></GatsbyImage>
          ))}
        </div>
        <div className='product-right'>
          {tagline ? (
            <div
              className='product-tagline-container'
              dangerouslySetInnerHTML={{ __html: tagline }}
            ></div>
          ) : (
            <h1 className='product-title'>{title}</h1>
          )}
          {priceRangeV2.minVariantPrice.amount > 0 && (
            <p className='product-price'>
              ${priceRangeV2.minVariantPrice.amount}
            </p>
          )}
          <div
            className='product-description'
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          ></div>
          {details && (
            <div
              dangerouslySetInnerHTML={{ __html: details }}
              className='product-details'
            ></div>
          )}
          {totalInventory > 0 && (
            <button
              onClick={() => addVariantToCart(data.shopifyProduct, 1)}
              className='add-to-cart-btn'
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getSingleProduct($handle: String) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      media {
        ... on ShopifyMediaImage {
          id
          image {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
      title
      metafields {
        key
        value
      }
      vendor
      descriptionHtml
      priceRangeV2 {
        minVariantPrice {
          amount
        }
      }
      totalInventory
      variants {
        shopifyId
      }
    }
  }
`

export default ProductPage
