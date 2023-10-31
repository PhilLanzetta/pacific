import React, { useState } from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const Projects = ({ data }) => {
  const allProjects = data.allContentfulCaseStudy.nodes
  const disciplineTags = data.allContentfulTag.nodes.filter((node) =>
    node.name.includes('Discipline')
  )
  const [projects, setProjects] = useState(allProjects)
  const [filterCat, setFilterCat] = useState('D')
  return (
    <Layout>
      <div className='filter-container'>
        <div className='filter-categories'>
          Filter by: <button>Discipline</button> / <button>Industry</button> /{' '}
          <button>Topic</button>
        </div>
        {filterCat === 'D' && (
          <div className='tag-container'>
            Tags:{' '}
            {disciplineTags.map((tag) => {
              const discipline = tag.name.split(': ')[1]
              return <button>{discipline}</button>
            })}
          </div>
        )}
      </div>
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

export default Projects
