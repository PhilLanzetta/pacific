import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Content from '../components/content'

const CaseStudy = ({ data }) => {
  const { client, year, location, headerImage, content, headerText } =
    data.contentfulCaseStudy
  return (
    <div className='case-study-page'>
      {headerImage && !headerText && (
        <div className='header-image'>
          <GatsbyImage
            image={headerImage.image.gatsbyImageData}
            alt={headerImage.image.description}
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
        </div>
        {content && <Content content={content}></Content>}
      </div>
    </div>
  )
}

export const query = graphql`
  query getSingleCaseStudy($slug: String) {
    contentfulCaseStudy(slug: { eq: $slug }) {
      year
      location
      client
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

export default CaseStudy
