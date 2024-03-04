import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Content from '../components/content'
import Layout from '../components/layout'
import Seo from '../components/seo'
import RelatedCarousel from '../components/relatedCarousel'
import useWindowSize from '../utils/useWindowSize'
import { Fade } from 'react-awesome-reveal'

const CaseStudy = ({ data }) => {
  const {
    client,
    year,
    location,
    headerImage,
    content,
    headerText,
    awards,
    press,
    shopifyHandle,
    related,
  } = data.contentfulCaseStudy
  const { width } = useWindowSize()
  const isMobile = width < 1111

  const primaryContent = [content[0]]
  const secondaryContent = content.slice(1)

  return (
    <Layout>
      <div className='case-study-page'>
        {headerImage && !headerText && (
          <div className='header-image'>
            <GatsbyImage
              image={headerImage.image.gatsbyImageData}
              alt={headerImage.image.description}
              className='header-image-image'
            ></GatsbyImage>
            <p className='header-image-caption'>{headerImage.caption}</p>
          </div>
        )}
        {headerImage && headerText && (
          <div className='header-image-with-text'>
            <div className='header-image-with-text-image'>
              <GatsbyImage
                image={headerImage.image.gatsbyImageData}
                alt={headerImage.image.description}
              ></GatsbyImage>
              <p className='header-image-caption'>{headerImage.caption}</p>
            </div>
            <div
              className='header-image-with-text-text'
              dangerouslySetInnerHTML={{
                __html: headerText.childMarkdownRemark.html,
              }}
            ></div>
          </div>
        )}
        {headerText && !headerImage && (
          <div
            className='text-header'
            dangerouslySetInnerHTML={{
              __html: headerText.childMarkdownRemark.html,
            }}
          ></div>
        )}
        {isMobile ? (
          <div className='case-study-body'>
            {primaryContent && <Content content={primaryContent}></Content>}
            <div className='case-study-left'>
              {client && (
                <div>
                  <p>
                    <em>Client</em>
                  </p>
                  <p>{client}</p>
                </div>
              )}
              {year && (
                <div>
                  <p>
                    <em>Year</em>
                  </p>
                  <p>{year}</p>
                </div>
              )}
              {location && (
                <div>
                  <p>
                    <em>Location</em>
                  </p>
                  <p>{location}</p>
                </div>
              )}
              {awards && (
                <div>
                  <p>
                    <em>Awards</em>
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: awards.childMarkdownRemark.html,
                    }}
                  ></div>
                </div>
              )}
              {press && (
                <div className='case-study-tag-container'>
                  <p>
                    <em>Press</em>
                  </p>
                  {press.map((pressItem) => (
                    <a
                      href={pressItem.articleUrl}
                      target='_blank'
                      rel='noreferrer'
                      key={pressItem.id}
                    >
                      {pressItem.publication}
                    </a>
                  ))}
                </div>
              )}
              {shopifyHandle && (
                <Link
                  to={`/shop${shopifyHandle}`}
                  className='case-study-purchase-button'
                >
                  Purchase
                </Link>
              )}
            </div>
            {secondaryContent && <Content content={secondaryContent}></Content>}
          </div>
        ) : (
          <div className='case-study-body'>
            <div className='case-study-left'>
              {client && (
                <div>
                  <p>
                    <em>Client</em>
                  </p>
                  <p>{client}</p>
                </div>
              )}
              {year && (
                <div>
                  <p>
                    <em>Year</em>
                  </p>
                  <p>{year}</p>
                </div>
              )}
              {location && (
                <div>
                  <p>
                    <em>Location</em>
                  </p>
                  <p>{location}</p>
                </div>
              )}
              {awards && (
                <div>
                  <p>
                    <em>Awards</em>
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: awards.childMarkdownRemark.html,
                    }}
                  ></div>
                </div>
              )}
              {press && (
                <div className='case-study-tag-container'>
                  <p>
                    <em>Press</em>
                  </p>
                  {press.map((pressItem) => (
                    <a
                      href={pressItem.articleUrl}
                      target='_blank'
                      rel='noreferrer'
                      key={pressItem.id}
                    >
                      {pressItem.publication}
                    </a>
                  ))}
                </div>
              )}
              {shopifyHandle && (
                <Link
                  to={`/shop${shopifyHandle}`}
                  className='case-study-purchase-button'
                >
                  Purchase
                </Link>
              )}
            </div>
            {content && <Content content={content}></Content>}
          </div>
        )}
      </div>
      {related && (
        <Fade triggerOnce>
          <div className='related-projects'>
            <h2>Explore More</h2>
            <RelatedCarousel slideCount={3} data={related}></RelatedCarousel>
          </div>
        </Fade>
      )}
    </Layout>
  )
}

export const query = graphql`
  query getSingleCaseStudy($slug: String) {
    contentfulCaseStudy(slug: { eq: $slug }) {
      slug
      title
      year
      location
      shopifyHandle
      client
      awards {
        childMarkdownRemark {
          html
        }
      }
      press {
        id
        publication
        articleUrl
      }
      headerImage {
        caption
        image {
          description
          gatsbyImageData
        }
      }
      headerText {
        childMarkdownRemark {
          html
        }
      }
      related {
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
      }
      content {
        ... on ContentfulAudioModule {
          audioId: id
          audioDescription
          audioUrl
          title
        }
        ... on ContentfulBodyText {
          bodyTextId: id
          columns
          text {
            childMarkdownRemark {
              html
            }
          }
        }
        ... on ContentfulVideoModule {
          videoId: id
          videoLink
          fullBleed
          title
        }
        ... on ContentfulImageModule {
          imageId: id
          columns
          fullBleed
          images {
            caption
            id
            image {
              gatsbyImageData
              description
            }
          }
        }
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.contentfulCaseStudy.title} />

export default CaseStudy
