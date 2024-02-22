import React from 'react'
import Layout from '../../components/layout'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Seo from '../../components/seo'
import { Fade } from 'react-awesome-reveal'

const Publishing = ({ data, location }) => {
  const publishing = data.allContentfulCaseStudy.nodes

  return (
    <Layout location={location}>
      <h1 className='product-page-title'>Publishing</h1>
      <div className='product-tag-container'>
        <Link to='/publishing' activeClassName='active-filter-button'>
          Design
        </Link>
        <Link to='/publishing/imprint' activeClassName='active-filter-button'>
          Imprint
        </Link>
      </div>
      <div className='projects-container'>
        <div className='project-tiles-container'>
          {publishing.map((project) => (
            <Fade className='project-tile' triggerOnce={true} key={project.id}>
              <Link to={`/studio/${project.slug}`}>
                {project.tileImage && (
                  <GatsbyImage
                    image={project.tileImage.image.gatsbyImageData}
                    alt={project.tileImage.image.description}
                  ></GatsbyImage>
                )}
                <p className='project-tile-title'>
                  <em>{project.title}</em>
                </p>
                <p>{project.subtitle}</p>
              </Link>
            </Fade>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulCaseStudy(
      filter: { category: { eq: "Publishing" } }
      sort: { order: DESC }
    ) {
      nodes {
        id
        tileImage {
          image {
            gatsbyImageData
            description
          }
        }
        slug
        isFeatured
        subtitle
        title
        metadata {
          tags {
            name
          }
        }
      }
    }
    allContentfulTag(sort: { name: ASC }) {
      nodes {
        name
      }
    }
  }
`

export const Head = () => <Seo title='Publishing' />

export default Publishing
