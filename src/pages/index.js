import React from 'react'
import { Link, graphql } from 'gatsby'
import Seo from '../components/seo'
import Layout from '../components/layout'
import HomeHero from '../components/homeHero'
import { BsArrowRight } from 'react-icons/bs'
import FeaturedTile from '../components/featuredTile'
import Carousel from '../components/carousel'

const Index = ({ data }) => {
  const featuredProjects = data.contentfulHomePage.featuredProjects
  const featuredPublications = data.contentfulHomePage.featuredPublications
  const featuredEditorial = data.contentfulHomePage.featuredEditorial
  const featuredNews = data.contentfulHomePage.featuredNews
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
            <FeaturedTile key={project.id} project={project}></FeaturedTile>
          ))}
        </div>
      </div>
      <div className='featured-container'>
        <h2>Publications</h2>
        <Carousel data={featuredPublications} slideCount={2.75}></Carousel>
      </div>
      <div className='featured-container'>
        <h2>Editorial</h2>
        <div className='featured-tile-container'>
          {featuredEditorial.map((project) => (
            <FeaturedTile key={project.id} project={project}></FeaturedTile>
          ))}
        </div>
      </div>
      <div className='featured-container'>
        <h2>News</h2>
        <div className='featured-news-container'>
          {featuredNews.map((news) => (
            <Link to='/news' key={news.id} className='featured-news-link'>
              <p>{news.newsTitle}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: news.newsHeadline.childMarkdownRemark.html,
                }}
              ></div>
              <div className='learn-more-link'>
                <BsArrowRight></BsArrowRight> Read More
              </div>
            </Link>
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
        id
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
      featuredPublications {
        id
        headerImage {
          image {
            gatsbyImageData
            description
          }
        }
        slug
        subtitle
        title
      }
      featuredEditorial {
        id
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
      featuredNews {
        id
        newsTitle
        newsHeadline {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`

export const Head = () => <Seo title='Home' />

export default Index
