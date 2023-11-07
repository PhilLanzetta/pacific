import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ProductTile from '../components/productTile'

const Shop = ({ data, location }) => {
  const allProducts = data.allShopifyProduct.nodes
  const [products, setProducts] = useState(allProducts)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    let result = allProducts
    if (filter === 'all') {
      result = allProducts
    } else {
      result = allProducts.filter((product) => {
        const productCollections = product.collections.map((collection) =>
          collection.title.toLowerCase()
        )
        return productCollections.includes(filter)
      })
    }
    setProducts(result)
  }, [filter])

  return (
    <Layout location={location}>
      <h1 className='product-page-title'>Shop</h1>
      <div className='product-tag-container'>
        <button
          className={filter === 'editions' ? 'active-filter-button' : ''}
          onClick={() => setFilter('editions')}
        >
          Apparel
        </button>
        <button
          className={filter === 'books' ? 'active-filter-button' : ''}
          onClick={() => setFilter('books')}
        >
          Books
        </button>
        <button
          className={filter === 'ephemera' ? 'active-filter-button' : ''}
          onClick={() => setFilter('ephemera')}
        >
          Ephemera
        </button>
        <button
          className={filter === 'all' ? 'active-filter-button' : ''}
          onClick={() => setFilter('all')}
        >
          Everything
        </button>
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
  query {
    allShopifyProduct {
      nodes {
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
  }
`

export default Shop
