import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import ProductTile from '../components/productTile'

const CollectionTemplate = ({ data, location }) => {
  const products = data.shopifyCollection.products
  const collections = data.allShopifyCollection.nodes.filter(
    (collection) => collection.title !== 'Featured'
  )

  return (
    <Layout location={location}>
      <h1 className='product-page-title'>Shop</h1>
      <div className='product-tag-container'>
        {collections.map((collection) => (
          <Link
            key={collection.id}
            to={`/collections/${collection.handle}`}
            activeClassName='active-filter-button'
          >
            {collection.title}
          </Link>
        ))}
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

export default CollectionTemplate
