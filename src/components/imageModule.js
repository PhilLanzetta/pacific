import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

const ImageModule = ({ content }) => {
  return (
    <div
      className={`image-module-container ${
        content.fullBleed ? '' : 'normal-margin'
      }`}
    >
      {content.images.map((image) => (
        <GatsbyImage
          image={image.image?.gatsbyImageData}
          alt={image.image?.description}
          className={`image-module-${content.columns}`}
        ></GatsbyImage>
      ))}
    </div>
  )
}

export default ImageModule
