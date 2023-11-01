import React from 'react'
import Layout from '../components/layout'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { BsArrowRight } from 'react-icons/bs'

const About = ({ data }) => {
  const {
    aboveTheFoldText,
    aboutText,
    adamBio,
    adamHeadshot,
    lizBio,
    lizHeadshot,
    artists,
    awards,
    brandingServices,
    printServices,
    experientialServices,
    digitalServices,
    selectClients,
    studioImage,
    collections,
    talksLectures,
  } = data.contentfulAboutPage
  return (
    <Layout>
      <div className='about-page'>
        <div
          className='about-above-the-fold'
          dangerouslySetInnerHTML={{
            __html: aboveTheFoldText.childMarkdownRemark.html,
          }}
        ></div>
        <div>
          <h2 className='about-section-title'>About</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: aboutText.childMarkdownRemark.html,
            }}
            className='about-text'
          ></div>
        </div>
        <div>
          <h2 className='about-section-title'>Services</h2>
          <div className='about-services'>
            <div className='about-service-column'>
              <h3 className='about-service-title'>Branding</h3>
              <ul className='about-service-list'>
                {brandingServices.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div className='about-service-column'>
              <h3 className='about-service-title'>Print</h3>
              <ul className='about-service-list'>
                {printServices.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div className='about-service-column'>
              <h3 className='about-service-title'>Digital</h3>
              <ul className='about-service-list'>
                {digitalServices.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div className='about-service-column'>
              <h3 className='about-service-title'>Experiential</h3>
              <ul className='about-service-list'>
                {experientialServices.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='about-section'>
          <h2 className='about-section-title'>Select Clients</h2>
          <ul className='four-column-container'>
            {selectClients.map((client, index) => (
              <li key={index}>{client}</li>
            ))}
          </ul>
        </div>
        <div className='about-section'>
          <h2 className='about-section-title'>Founders</h2>
          <div className='founders-container'>
            <div className='founder'>
              <GatsbyImage
                image={lizHeadshot.gatsbyImageData}
                alt={lizHeadshot.description}
              ></GatsbyImage>
              <div
                className='founder-bio'
                dangerouslySetInnerHTML={{
                  __html: lizBio.childMarkdownRemark.html,
                }}
              ></div>
            </div>
            <div className='founder'>
              <GatsbyImage
                image={adamHeadshot.gatsbyImageData}
                alt={adamHeadshot.description}
              ></GatsbyImage>
              <div
                dangerouslySetInnerHTML={{
                  __html: adamBio.childMarkdownRemark.html,
                }}
                className='founder-bio'
              ></div>
            </div>
          </div>
        </div>
        <div className='about-section'>
          <h2 className='about-section-title'>Studio</h2>
          <GatsbyImage
            image={studioImage.gatsbyImageData}
            alt={studioImage.description}
          ></GatsbyImage>
        </div>
        <div className='about-section'>
          <h2 className='about-studio-section-title'>Collections</h2>
          <div className='collections-container'>
            <div className='collections-preface'>
              Our design and publishing work is held in the following
              collections
            </div>
            <ul className='collections-list'>
              {collections.map((collection, index) => (
                <li key={index}>{collection}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='about-section'>
          <h2 className='about-studio-section-title'>Artists</h2>
          <ul className='four-column-container'>
            {artists.map((artist, index) => (
              <li key={index}>{artist}</li>
            ))}
          </ul>
        </div>
        <div className='about-section'>
          <h2 className='about-studio-section-title'>Awards</h2>
          <ul className='four-column-container'>
            {awards.map((award, index) => (
              <li key={index} className='about-award'>
                {award}
              </li>
            ))}
          </ul>
        </div>
        <div className='about-section'>
          <h2 className='about-studio-section-title'>Talks & Lectures</h2>
          <div
            className='four-column-container talks-lectures'
            dangerouslySetInnerHTML={{
              __html: talksLectures.childMarkdownRemark.html,
            }}
          ></div>
        </div>
        <div className='about-section'>
          <h2 className='about-section-title'>Press</h2>
          <Link to='/press' className='press-link'>
            <BsArrowRight></BsArrowRight>View our press page
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulAboutPage {
      aboutText {
        childMarkdownRemark {
          html
        }
      }
      aboveTheFoldText {
        childMarkdownRemark {
          html
        }
      }
      adamBio {
        childMarkdownRemark {
          html
        }
      }
      adamHeadshot {
        gatsbyImageData
        description
      }
      artists
      awards
      brandingServices
      collections
      digitalServices
      experientialServices
      id
      lizBio {
        childMarkdownRemark {
          html
        }
      }
      lizHeadshot {
        description
        gatsbyImageData
      }
      studioImage {
        description
        gatsbyImageData
      }
      talksLectures {
        childMarkdownRemark {
          html
        }
      }
      selectClients
      printServices
    }
  }
`

export default About
