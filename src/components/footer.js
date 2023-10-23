import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className='footer-link-container'>
        <a
          href='https://www.instagram.com/pacific_pacific'
          target='_blank'
          rel='noreferrer'
        >
          <p>
            <em>Instagram</em>
          </p>
          <p>@pacific_pacific</p>
        </a>
        <a
          href='https://www.linkedin.com/pacific_pacific'
          target='_blank'
          rel='noreferrer'
        >
          <p>
            <em>LinkedIn</em>
          </p>
          <p>@pacific_pacific</p>
        </a>
        <button>
          <p>
            <em>Newsletter</em>
          </p>
          <p>Sign Up</p>
        </button>
        <a href='mailto:studio@pacificpacific.pub'>
          <p>
            <em>Contact</em>
          </p>
          <p>studio@pacificpacific.pub</p>
        </a>
        <a href='mailto:business@pacificpacific.pub'>
          <p>
            <em>New Business</em>
          </p>
          <p>business@pacificpacific.pub</p>
        </a>
        <a
          href='https://maps.app.goo.gl/tx9VpgZexeT4MMAB8'
          target='_blank'
          rel='noreferrer'
        >
          <p>70 Flushing Avenue,</p>
          <p>Brooklyn, NY, 11222, USA</p>
        </a>
      </div>
      <p className='footer-logo'>Pacific</p>
    </footer>
  )
}

export default Footer
