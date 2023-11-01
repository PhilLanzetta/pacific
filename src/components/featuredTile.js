import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const FeaturedTile = ({ project }) => {
  const { slug, title, subtitle, tileImage } = project.caseStudy
  return (
    <Link to={`/projects/${slug}`} className={`featured-${project.width}`}>
      <GatsbyImage
        image={tileImage.image.gatsbyImageData}
        alt={tileImage.image.description}
      ></GatsbyImage>
      <h3 className='featured-tile-title'>{title}</h3>
      <h4 className='featured-tile-subtitle'>{subtitle}</h4>
    </Link>
  )
}

export default FeaturedTile
