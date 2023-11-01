import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { GatsbyImage } from 'gatsby-plugin-image'
import { BsArrowUpRight } from 'react-icons/bs'
import Seo from '../components/seo'

const Press = ({ data }) => {
  const pressItems = data.allContentfulPressItem.nodes
  return (
    <Layout>
      <h1 className='news-page-title'>Press</h1>
      <div className='press-container'>
        {pressItems.map((item) => (
          <a
            key={item.id}
            href={item.articleUrl}
            className='press-item'
            target='_blank'
            rel='noreferrer'
          >
            <GatsbyImage
              image={item.pressImage.gatsbyImageData}
              alt={item.pressImage.description}
            ></GatsbyImage>
            <p className='press-date'>
              {new Date(item.publicationDate).toLocaleDateString('en-us')}
            </p>
            <p className='press-publication'>{item.publication}</p>
            <p>{item.title}</p>
            <div className='press-link-out'>
              <BsArrowUpRight></BsArrowUpRight> VIEW ARTICLE
            </div>
          </a>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulPressItem(sort: { publicationDate: DESC }) {
      nodes {
        id
        articleUrl
        pressImage {
          description
          gatsbyImageData
        }
        publication
        publicationDate
        title
      }
    }
  }
`
export const Head = () => <Seo title='Press' />

export default Press
