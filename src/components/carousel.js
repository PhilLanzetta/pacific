import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import Slider from 'react-slick'

const Carousel = ({ data, slideCount }) => {
  const settings = {
    slidesToShow: slideCount,
    infinite: false,
    useTransform: false,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1.15,
        },
      },
    ],
  }

  return (
    <Slider {...settings}>
      {data.map((pub) => (
        <Link
          to={`/projects/${pub.slug}`}
          key={pub.id}
          className='carousel-link'
        >
          <GatsbyImage
            className='carousel-image'
            image={pub.headerImage.image.gatsbyImageData}
            alt={pub.headerImage.image.description}
          ></GatsbyImage>
          <p className='carousel-title'>{pub.title}</p>
          <p className='carousel-subtitle'>{pub.subtitle}</p>
        </Link>
      ))}
    </Slider>
  )
}

export default Carousel
