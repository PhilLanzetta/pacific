import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'
import { Fade } from 'react-awesome-reveal'

const Projects = ({ data, location }) => {
  const allProjects = data.allContentfulCaseStudy.nodes
  const featuredProjects = data.allContentfulCaseStudy.nodes.filter(
    (node) => node.isFeatured === true
  )
  const disciplineTags = data.allContentfulTag.nodes
    .filter((node) => node.name.includes('Discipline'))
    .map((node) => node.name)

  const industryTags = data.allContentfulTag.nodes
    .filter((node) => node.name.includes('Industry'))
    .map((node) => node.name)

  const topicTags = data.allContentfulTag.nodes
    .filter((node) => node.name.includes('Topic'))
    .map((node) => node.name)

  const [projects, setProjects] = useState(featuredProjects)
  const [filterCat, setFilterCat] = useState('D')
  const [tags, setTags] = useState(location.state?.tag || [])
  const [userClick, setUserClick] = useState(false)

  const handleTagClick = (newTag) => {
    if (tags.includes(newTag)) {
      setTags(tags.filter((tag) => tag !== newTag))
    } else {
      setTags([...tags, newTag])
    }
  }

  useEffect(() => {
    if (tags.length) {
      const result = allProjects.filter((project) => {
        const projectTags = project.metadata.tags.map((tag) => tag.name)
        return tags.some((value) => projectTags.includes(value))
      })
      setProjects(result)
      setUserClick(true)
    }
    if (userClick && tags.length === 0) {
      setProjects(allProjects)
    }
    if (!userClick) {
      return
    }
  }, [tags])

  return (
    <Layout location={location} setTags={setTags}>
      <div className='filter-container'>
        <div className='filter-categories'>
            <button
              onClick={() => setFilterCat('D')}
              className={filterCat === 'D' ? 'filter-category-active' : 'filter-category-button'}
            >
              Discipline
            </button>{' '}
            /{' '}
            <button
              onClick={() => setFilterCat('I')}
              className={filterCat === 'I' ? 'filter-category-active' : 'filter-category-button'}
            >
              Industry
            </button>{' '}
        </div>
        {filterCat === 'D' && (
          <div className='tag-container'>
            Tags:{' '}
            {disciplineTags.map((tag, index) => {
              const discipline = tag.split(': ')[1]
              return (
                <button
                  key={index}
                  className={
                    tags.length > 0
                      ? tags.includes(tag)
                        ? 'active-filter-button'
                        : 'non-active-filter-button'
                      : ''
                  }
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
        {!userClick && (
          <p className='featured-projects-heading'>Featured Projects</p>
        )}
        <div className='project-tiles-container'>
          {projects.map((project) => (
            <Fade className='project-tile' triggerOnce={true} key={project.id}>
              <Link to={`/projects/${project.slug}`}>
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

export const Head = () => <Seo title='Projects' />

export default Projects
