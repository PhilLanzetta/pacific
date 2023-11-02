import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'

const Projects = ({ data, location }) => {
  const allProjects = data.allContentfulCaseStudy.nodes
  const disciplineTags = data.allContentfulTag.nodes
    .filter((node) => node.name.includes('Discipline'))
    .map((node) => node.name)

  const industryTags = data.allContentfulTag.nodes
    .filter((node) => node.name.includes('Industry'))
    .map((node) => node.name)

  const topicTags = data.allContentfulTag.nodes
    .filter((node) => node.name.includes('Topic'))
    .map((node) => node.name)

  const [projects, setProjects] = useState(allProjects)
  const [filterCat, setFilterCat] = useState('D')
  const [tags, setTags] = useState(location.state?.tag || [])

  const handleTagClick = (newTag) => {
    if (tags.includes(newTag)) {
      setTags(tags.filter((tag) => tag !== newTag))
    } else {
      setTags([...tags, newTag])
    }
  }

  useEffect(() => {
    let result = allProjects
    if (tags.length) {
      result = allProjects.filter((project) => {
        const projectTags = project.metadata.tags.map((tag) => tag.name)
        return tags.some((value) => projectTags.includes(value))
      })
    }
    setProjects(result)
  }, [tags])

  return (
    <Layout location={location} setTags={setTags}>
      <div className='filter-container'>
        <div className='filter-categories'>
          <div className='filter-categories-buttons'>
            <button
              onClick={() => setFilterCat('D')}
              className={filterCat === 'D' ? 'filter-category-active' : ''}
            >
              Discipline
            </button>{' '}
            /{' '}
            <button
              onClick={() => setFilterCat('I')}
              className={filterCat === 'I' ? 'filter-category-active' : ''}
            >
              Industry
            </button>{' '}
            /{' '}
            <button
              onClick={() => setFilterCat('T')}
              className={filterCat === 'T' ? 'filter-category-active' : ''}
            >
              Topic
            </button>
          </div>
        </div>
        {filterCat === 'D' && (
          <div className='tag-container'>
            Tags:{' '}
            {disciplineTags.map((tag, index) => {
              const discipline = tag.split(': ')[1]
              return (
                <button
                  key={index}
                  className={tags.includes(tag) ? 'active-filter-button' : ''}
                  onClick={() => handleTagClick(tag)}
                >
                  {discipline}
                </button>
              )
            })}
          </div>
        )}
        {filterCat === 'I' && (
          <div className='tag-container'>
            Tags:{' '}
            {industryTags.map((tag, index) => {
              const discipline = tag.split(': ')[1]
              return (
                <button
                  key={index}
                  className={tags.includes(tag) ? 'active-filter-button' : ''}
                  onClick={() => handleTagClick(tag)}
                >
                  {discipline}
                </button>
              )
            })}
          </div>
        )}
        {filterCat === 'T' && (
          <div className='tag-container'>
            Tags:{' '}
            {topicTags.map((tag, index) => {
              const discipline = tag.split(': ')[1]
              return (
                <button
                  key={index}
                  className={tags.includes(tag) ? 'active-filter-button' : ''}
                  onClick={() => handleTagClick(tag)}
                >
                  {discipline}
                </button>
              )
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

export const Head = () => <Seo title='Projects' />

export default Projects
