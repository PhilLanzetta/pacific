import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { RelatedProjectsFactory } from './relatedProjectsFactory'
import { GatsbyImage } from 'gatsby-plugin-image'
import RelatedCarousel from './relatedCarousel'

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

  return (
    <div className='related-projects'>
      <h2>Explore More</h2>
      <RelatedCarousel slideCount={3} data={relatedProjects}></RelatedCarousel>
    </div>
  )
}

export default Related
