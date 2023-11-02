import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { RelatedProjectsFactory } from './relatedProjectsFactory'
import { GatsbyImage } from 'gatsby-plugin-image'

const Related = ({ currentProjectSlug, tags }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCaseStudy {
        nodes {
          id
          slug
          title
          subtitle
          tileImage {
            image {
              description
              gatsbyImageData
            }
          }
          metadata {
            tags {
              name
            }
          }
        }
      }
    }
  `)

  const projects = data.allContentfulCaseStudy.nodes

  const relatedProjectsArray = new RelatedProjectsFactory(
    projects,
    currentProjectSlug
  )
    .setMaxProjects(3)
    .setTags(tags)
    .getProjects()

  const relatedProjects = relatedProjectsArray.map((item) => item.project)

  console.log(relatedProjectsArray)

  return (
    <div className='related-projects'>
      <h2>Explore More</h2>
      <div className='related-projects-container'>
        {relatedProjects.map((project) => (
          <Link key={project.id} to={`/projects/${project.slug}`}>
            <GatsbyImage
              image={project.tileImage.image.gatsbyImageData}
              alt={project.tileImage.image.description}
              className='related-img'
            ></GatsbyImage>
            <p>
              <em>{project.title}</em>
            </p>
            <p>{project.subtitle}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Related
