/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions
  const result = await graphql(`
    query GetData {
      allContentfulCaseStudy {
        edges {
          node {
            slug
          }
        }
      }
      allShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
      allShopifyCollection {
        edges {
          node {
            handle
          }
        }
      }
    }
  `)

  const caseStudies = result.data.allContentfulCaseStudy.edges

  const products = result.data.allShopifyProduct.edges

  const collections = result.data.allShopifyCollection.edges

  caseStudies.forEach(({ node }) => {
    const caseStudySlug = node.slug
    createPage({
      path: `/studio/${caseStudySlug}`,
      component: require.resolve('./src/templates/case-study-template.js'),
      context: { slug: caseStudySlug },
    })
  })

  products.forEach(({ node }) => {
    const productSlug = node.handle
    createPage({
      path: `/shop/${productSlug}`,
      component: require.resolve('./src/templates/product-template.js'),
      context: { handle: productSlug },
    })
  })

  collections.forEach(({ node }) => {
    const collectionSlug = node.handle
    createPage({
      path: `/collections/${collectionSlug}`,
      component: require.resolve('./src/templates/collection-template.js'),
      context: { handle: collectionSlug },
    })
  })

  createRedirect({
    fromPath: `/projects/*`,
    toPath: `/studio/*`,
  })
}
