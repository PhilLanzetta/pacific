import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'
import { Fade } from 'react-awesome-reveal'
import { RiLayoutGridFill } from 'react-icons/ri'
import { PiListBold } from 'react-icons/pi'
import { RiArrowRightLine } from 'react-icons/ri'

const Studio = ({ data, location }) => {
  const caseStudy = data.allContentfulCaseStudy.nodes
  const [view, setView] = useState()

  useEffect(() => {
    if (localStorage.getItem('view')) {
      setView(localStorage.getItem('view'))
    } else {
      setView('grid')
    }
  }, [])

  return (
    <Layout location={location}>
      <h1 className='product-page-title'>Studio</h1>
      <div className='product-tag-container'>
        <Link to='/studio' activeClassName='active-filter-button'>
          Case Studies
        </Link>
        <button
          className={`view-button ${view === 'grid' ? '' : 'faded'}`}
          onClick={() => {
            localStorage.setItem('view', 'grid')
            setView('grid')
          }}
        >
          Grid
          <RiLayoutGridFill></RiLayoutGridFill>
        </button>
        <button
          className={`view-button ${view === 'list' ? '' : 'faded'}`}
          onClick={() => {
            localStorage.setItem('view', 'list')
            setView('list')
          }}
        >
          List
          <PiListBold></PiListBold>
        </button>
      </div>
      <div
        className={
          view === 'grid' ? 'projects-container' : 'list-projects-container'
        }
      >
        {view === 'grid' && (
          <div className='project-tiles-container'>
            {caseStudy.map((project) => (
              <Fade
                className='project-tile'
                triggerOnce={true}
                key={project.id}
              >
                {project.isComingSoon ? (
                  <div>
                    {project.tileImage && (
                      <GatsbyImage
                        image={project.tileImage.image.gatsbyImageData}
                        alt={project.tileImage.image.description}
                      ></GatsbyImage>
                    )}
                    <p className='project-tile-soon'>
                      <em>Coming Soon</em>
                    </p>
                    <p>
                      <em>{project.title}</em>
                    </p>
                    <p>{project.subtitle}</p>
                  </div>
                ) : (
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
                )}
              </Fade>
            ))}
          </div>
        )}
        {view === 'list' && (
          <div className='project-list-container'>
            {caseStudy.map((project) => (
              <Fade triggerOnce={true} key={project.id}>
                {project.isComingSoon ? (
                  <div className='project-listing'>
                    <div 
                    id="listing-soon" className='project-listing-text'>
                      <p className='listing-soon'>{project.title}</p>
                      <p className='listing-soon'>
                        <em>{project.subtitle}</em>
                      </p>
                      <p className='listing-soon'>
                        <ul className='listing-scope'>
                          {project.scope?.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </p>
                      <p className='listing-soon'>
                        <span className='list-view-go-soon'>Coming Soon</span>
                      </p>
                    </div>
                    {project.tileImage && (
                      <GatsbyImage
                        image={project.tileImage.image.gatsbyImageData}
                        alt={project.tileImage.image.description}
                        className='listing-image'
                      ></GatsbyImage>
                    )}
                  </div>
                ) : (
                  <Link
                    to={`/studio/${project.slug}`}
                    className='project-listing'
                  >
                    <div className='project-listing-text'>
                      <p>{project.title}</p>
                      <p>
                        <em>{project.subtitle}</em>
                      </p>
                      <p>
                        <ul className='listing-scope'>
                          {project.scope?.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </p>
                      <p>
                        <span className='list-view-go'>
                          View Case Study <RiArrowRightLine></RiArrowRightLine>
                        </span>
                      </p>
                    </div>
                    {project.tileImage && (
                      <GatsbyImage
                        image={project.tileImage.image.gatsbyImageData}
                        alt={project.tileImage.image.description}
                        className='listing-image'
                      ></GatsbyImage>
                    )}
                  </Link>
                )}
              </Fade>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulCaseStudy(
      filter: { category: { eq: "Case Study" } }
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
        isComingSoon
        scope
        subtitle
        title
      }
    }
    allContentfulTag(sort: { name: ASC }) {
      nodes {
        name
      }
    }
  }
`

export const Head = () => <Seo title='Studio' />

export default Studio
