/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
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
    }
  `)

  const caseStudies = result.data.allContentfulCaseStudy.edges

  const products = result.data.allShopifyProduct.edges

  caseStudies.forEach(({ node }) => {
    const caseStudySlug = node.slug
    createPage({
      path: `/projects/${caseStudySlug}`,
      component: require.resolve('./src/templates/case-study-template.js'),
      context: { slug: caseStudySlug },
    })
  })

  products.forEach(({ node }) => {
    const productSlug = node.handle
    createPage({
      path: `/shop/${productSlug}`,
      component: require.resolve('./src/templates/product-template.js'),
      context: { slug: productSlug },
    })
  })
}
