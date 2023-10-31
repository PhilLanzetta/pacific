import React, { useState } from 'react'
import { Link } from 'gatsby'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header>
      <div></div>
      <div className='header-logo'>
        <Link to='/'>Pacific</Link>
      </div>
      <div className='header-menu'>
        <button onClick={() => setIsOpen(!isOpen)}>
          Menu <span className='header-menu-button'>{isOpen ? 'x' : '+'}</span>
        </button>
        <div className={`secondary-menu ${isOpen ? 'menu-show' : 'menu-hide'}`}>
          <div className='secondary-main'>
            <Link to='/projects'>Projects</Link>
            <Link to='#'>Publications</Link>
            <Link to='#'>Editorial</Link>
            <Link to='#'>Shop</Link>
            <Link to='/news'>News</Link>
            <Link to='#'>About</Link>
          </div>
          <div className='secondary-sub'>
            <Link to='#'>Connect</Link>
            <Link to='#'>Press</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
