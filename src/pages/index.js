import React from 'react'
import { Link, graphql } from 'gatsby'
import Seo from '../components/seo'
import Layout from '../components/layout'
import HomeHero from '../components/homeHero'
import { BsArrowRight } from 'react-icons/bs'
import FeaturedTile from '../components/featuredTile'
import Carousel from '../components/carousel'
import Explore from '../components/explore'
import NewsCarousel from '../components/newsCarousel'
import ShopCarousel from '../components/shopCarousel'

const Index = ({ data }) => {
  const featuredProjects = data.contentfulHomePage.featuredProjects
  const featuredPublications = data.contentfulHomePage.featuredPublications
  const featuredEditorial = data.contentfulHomePage.featuredEditorial
  const featuredNews = data.contentfulHomePage.featuredNews
  const featuredProducts = data.allShopifyProduct.nodes
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
        <h2>Shop</h2>
        <ShopCarousel data={featuredProducts} slideCount={3}></ShopCarousel>
      </div>
      <div className='featured-container'>
        <h2>News</h2>
        <NewsCarousel data={featuredNews} slideCount={3}></NewsCarousel>
      </div>
      <Explore></Explore>
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
        featuredImage {
          gatsbyImageData
          description
        }
        caseStudy {
          title
          subtitle
          slug
        }
        width
      }
      featuredPublications {
        id
        featuredImage {
          gatsbyImageData
          description
        }
        caseStudy {
          title
          subtitle
          slug
        }
        width
      }
      featuredEditorial {
        id
        featuredImage {
          gatsbyImageData
          description
        }
        caseStudy {
          title
          subtitle
          slug
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
    allShopifyProduct(
      filter: { collections: { elemMatch: { title: { eq: "Featured" } } } }
      limit: 3
    ) {
      nodes {
        featuredImage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        handle
        id
        priceRangeV2 {
          minVariantPrice {
            amount
          }
        }
        metafields {
          value
          key
        }
      }
    }
  }
`

export const Head = () => <Seo title='Home' />

export default Index
