import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import ProductTile from '../components/productTile'
import Seo from '../components/seo'

const CollectionTemplate = ({ data, location }) => {
  const products = data.shopifyCollection.products
  const allCollections = data.allShopifyCollection.nodes.filter(
    (collection) => collection.title !== 'Featured'
  )

  const collections = allCollections.filter(
    (collection) => collection.title !== 'Everything'
  )

  const everything = allCollections.filter(
    (collection) => collection.title === 'Everything'
  )

  return (
    <Layout location={location}>
      <h1 className='product-page-title'>Shop</h1>
      <div className='product-tag-container'>
        {everything.map((collection) => (
          <Link
            key={collection.id}
            to={`/collections/${collection.handle}`}
            activeClassName='active-filter-button'
          >
            {collection.title}
          </Link>
        ))}
        <Link to={`/collections/books`} activeClassName='active-filter-button'>
          Books
        </Link>
        <Link
          to={`/collections/library`}
          activeClassName='active-filter-button'
        >
          Library
        </Link>
        <Link
          to={`/collections/editions`}
          activeClassName='active-filter-button'
        >
          Apparel
        </Link>
      </div>

      <div className='product-tiles-container'>
        {products.map((product) => (
          <ProductTile key={product.id} product={product}></ProductTile>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getSingleCollection($handle: String) {
    shopifyCollection(handle: { eq: $handle }) {
      products {
        featuredImage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        handle
        id
        collections {
          title
        }
        metafields {
          key
          value
        }
        title
        tags
        priceRangeV2 {
          minVariantPrice {
            amount
          }
        }
        totalInventory
      }
    }
    allShopifyCollection {
      nodes {
        id
        title
        handle
      }
    }
  }
`

export const Head = () => <Seo title='Shop' />

export default CollectionTemplate
