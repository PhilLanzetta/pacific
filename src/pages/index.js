import React from 'react'
import { Link, graphql } from 'gatsby'
import Seo from '../components/seo'
import Layout from '../components/layout'
import HomeHero from '../components/homeHero'
import { BsArrowRight } from 'react-icons/bs'
import FeaturedTile from '../components/featuredTile'

const Index = ({ data }) => {
  const featuredProjects = data.contentfulHomePage.featuredProjects
  return (
    <Layout>
      <HomeHero></HomeHero>
      <div className='home-about-preview'>
        <div className='home-about-preview-section'>
          <h2 className='home-about-headline'>
            {data.contentfulHomePage.aboutHeadline}
          </h2>
        </div>
        <div className='home-about-preview-section'>
          <div
            className='home-about-excerpt'
            dangerouslySetInnerHTML={{
              __html:
                data.contentfulHomePage.aboutExcerpt.childMarkdownRemark.html,
            }}
          ></div>
          <Link to='/about' className='learn-more-link'>
            <BsArrowRight></BsArrowRight> Learn More
          </Link>
        </div>
      </div>
      <div className='featured-container'>
        <h2>Featured Projects</h2>
        <div className='featured-tile-container'>
          {featuredProjects.map((project) => (
            <FeaturedTile project={project}></FeaturedTile>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulHomePage {
      aboutHeadline
      aboutExcerpt {
        childMarkdownRemark {
          html
        }
      }
      featuredProjects {
        caseStudy {
          title
          subtitle
          slug
          tileImage {
            image {
              gatsbyImageData
              description
            }
          }
        }
        width
      }
    }
  }
`

export const Head = () => <Seo title='Home' />

export default Index
