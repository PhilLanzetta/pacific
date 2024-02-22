import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'
import { Fade } from 'react-awesome-reveal'

const Publishing = ({ data, location }) => {
  const publishing = data.allContentfulCaseStudy.nodes.filter((node) => {
    console.log(node)
    const nodeTags = node.metadata.tags.map((tag) => tag.name)
    return nodeTags.includes('Discipline: Publishing')
  })

  return (
    <Layout location={location}>
      <div className='filter-container'>
        Publishing: <em>Design Imprint</em>
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
    allContentfulCaseStudy(sort: { order: DESC }) {
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
