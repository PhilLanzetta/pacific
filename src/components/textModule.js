import React from 'react'

const TextModule = ({ content }) => {
  return (
    <div
      className='module-text-container'
      dangerouslySetInnerHTML={{
        __html: content.text.childMarkdownRemark.html,
      }}
    ></div>
  )
}

export default TextModule
