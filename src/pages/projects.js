import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const Projects = ({ data }) => {
  const projects = data.allContentfulCaseStudy.nodes
  return (
    <Layout>
      <div className='projects-container'>
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.slug}`}
            className='project-tile'
          >
            {project.tileImage && (
              <GatsbyImage
                image={project.tileImage.image.gatsbyImageData}
                alt={project.tileImage.image.description}
              ></GatsbyImage>
            )}
            <p>
              <em>{project.title}</em>
            </p>
            <p>{project.subtitle}</p>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulCaseStudy(sort: { year: DESC }) {
      nodes {
        id
        tileImage {
          image {
            gatsbyImageData
            description
          }
        }
        slug
        subtitle
        title
      }
    }
  }
`

export default Projects
