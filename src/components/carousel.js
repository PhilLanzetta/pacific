import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useRef } from 'react'
import Slider from 'react-slick'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'
import useWindowSize from '../utils/useWindowSize'

const Carousel = ({ data, slideCount }) => {
  const slideRef = useRef()
  const { width } = useWindowSize()

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
    <>
      <div className='pub-carousel-heading'>
        <h2>Publications</h2>
        {width > 600 && (
          <div className='pub-arrows-container'>
            <button
              className='pub-arrow'
              onClick={() => slideRef.current.slickPrev()}
              aria-label='go to previous'
            >
              <BsArrowLeft></BsArrowLeft>
            </button>
            <button
              className='pub-arrow'
              onClick={() => slideRef.current.slickNext()}
              aria-label='go to next'
            >
              <BsArrowRight></BsArrowRight>
            </button>
          </div>
        )}
      </div>
      <Slider {...settings} ref={slideRef}>
        {data.map((pub) => (
          <Link
            to={`/projects/${pub.caseStudy.slug}`}
            key={pub.id}
            className='carousel-link'
          >
            <GatsbyImage
              className='carousel-image'
              image={pub.featuredImage.gatsbyImageData}
              alt={pub.featuredImage.description}
            ></GatsbyImage>
            <p className='carousel-title'>{pub.caseStudy.title}</p>
            <p className='carousel-subtitle'>{pub.caseStudy.subtitle}</p>
          </Link>
        ))}
      </Slider>
    </>
  )
}

export default Carousel
