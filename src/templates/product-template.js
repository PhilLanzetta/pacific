import React, { useState } from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import useWindowSize from '../utils/useWindowSize'
import useStore from '../context/StoreContext'
import RelatedProducts from '../components/relatedProducts'
import Seo from '../components/seo'

const ProductPage = ({ location, data }) => {
  const { width } = useWindowSize()
  const [variantIndex, setVariantIndex] = useState(0)
  const isMobile = width < 601
  const {
    media,
    title,
    metafields,
    descriptionHtml,
    priceRangeV2,
    totalInventory,
    variants,
  } = data.shopifyProduct

  const desktopMedia = media.slice(1)
  const mobileHero = media[1]
  const mobileSecondary = media.slice(2)

  const { addVariantToCart } = useStore()

  const tagline = metafields.filter(
    (metafield) => metafield.key === 'tagline'
  )[0]?.value

  const details = metafields.filter(
    (metafield) => metafield.key === 'details'
  )[0]?.value

  const relatedProductsHandles = metafields
    .filter((field) => field.key === 'related_products')[0]
    ?.value.split('|')

  const sizes = variants
    .map((variant) =>
      variant.selectedOptions.filter((option) => option.name === 'Size')
    )
    .flat()

  return (
    <Layout location={location}>
      <div className='product-page-container'>
        {isMobile ? (
          <div className='mobile-product-image'>
            <GatsbyImage
              image={
                mobileHero.image?.localFile?.childImageSharp?.gatsbyImageData
              }
              className='product-image'
            ></GatsbyImage>
          </div>
        ) : (
          <div className='product-left'>
            {desktopMedia.map((image) => (
              <GatsbyImage
                key={image.id}
                image={image.image?.localFile?.childImageSharp?.gatsbyImageData}
                className='product-image'
              ></GatsbyImage>
            ))}
          </div>
        )}
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
            <>
              {sizes?.length > 0 && (
                <div className='product-size-container'>
                  <p>Size</p>
                  <p>-</p>
                  <select
                    className='product-size-select'
                    onChange={(e) => setVariantIndex(e.target.value * 1)}
                  >
                    {sizes.map((size, index) => (
                      <option key={index} value={index}>
                        {size.value}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
                onClick={() =>
                  addVariantToCart(data.shopifyProduct, variantIndex, 1)
                }
                className='add-to-cart-btn'
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
        {isMobile ? (
          <div className='mobile-product-secondary-images'>
            {mobileSecondary.map((image) => (
              <GatsbyImage
                key={image.id}
                image={image.image?.localFile?.childImageSharp?.gatsbyImageData}
                className='product-image'
              ></GatsbyImage>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {relatedProductsHandles?.length > 0 && (
        <RelatedProducts
          productHandles={relatedProductsHandles}
        ></RelatedProducts>
      )}
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
        selectedOptions {
          name
          value
        }
      }
    }
  }
`
export const Head = ({ data }) => <Seo title={data.shopifyProduct.title} />

export default ProductPage
