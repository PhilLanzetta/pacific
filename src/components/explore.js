import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

const Explore = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulTag {
        nodes {
          id
          name
        }
      }
    }
  `)

  const shuffleData = (array) => {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  const randomTags = shuffleData(data.allContentfulTag.nodes).slice(0, 20)

  return (
    <div className='explore-container'>
      <h2>Explore Our Website</h2>
      <div className='explore-tag-container'>
        {randomTags.map((tag) => (
          <Link
            to='/projects'
            state={{ tag: [tag.name] }}
            className='explore-tag-link'
          >
            {tag.name.split(': ')[1]}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Explore
