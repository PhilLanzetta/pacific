import React from 'react'
import { Link } from 'gatsby'

const Header = () => {
  return (
    <header>
      <div></div>
      <div className='header-logo'>
        <Link to='/'>Pacific</Link>
      </div>
      <div className='header-menu'>
        <button>Menu +</button>
      </div>
    </header>
  )
}

export default Header
