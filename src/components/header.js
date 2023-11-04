import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
import HideOnScroll from './hideOnScroll'

const Header = ({ location, setTags }) => {
  const [isOpen, setIsOpen] = useState(false)
  const isProjectPage = location?.pathname === '/projects/'
  return (
    <header>
      <div></div>
      <HideOnScroll>
        <Link to='/'>Pacific</Link>
      </HideOnScroll>
      <div className='header-menu'>
        <button onClick={() => setIsOpen(!isOpen)}>
          Menu <span className='header-menu-button'>{isOpen ? 'x' : '+'}</span>
        </button>
        <div className={`secondary-menu ${isOpen ? 'menu-show' : 'menu-hide'}`}>
          <div className='secondary-main'>
            {isProjectPage ? (
              <button
                onClick={() => {
                  setTags([])
                  navigate('/projects')
                  setIsOpen(false)
                }}
              >
                Projects
              </button>
            ) : (
              <Link to='/projects' onClick={() => setIsOpen(false)}>
                Projects
              </Link>
            )}
            {isProjectPage ? (
              <button
                onClick={() => {
                  setTags(['Discipline: Publications'])
                  navigate('/projects')
                  setIsOpen(false)
                }}
              >
                Publications
              </button>
            ) : (
              <Link
                to='/projects'
                state={{ tag: ['Discipline: Publications'] }}
                onClick={() => setIsOpen(false)}
              >
                Publications
              </Link>
            )}
            {isProjectPage ? (
              <button
                onClick={() => {
                  setTags(['Discipline: Editorial'])
                  navigate('/projects')
                  setIsOpen(false)
                }}
              >
                Editorial
              </button>
            ) : (
              <Link
                to='/projects'
                state={{ tag: ['Discipline: Editorial'] }}
                onClick={() => setIsOpen(false)}
              >
                Editorial
              </Link>
            )}
            <Link to='#' onClick={() => setIsOpen(false)}>
              Shop
            </Link>
            <Link to='/news' onClick={() => setIsOpen(false)}>
              News
            </Link>
            <Link to='/about' onClick={() => setIsOpen(false)}>
              About
            </Link>
          </div>
          <div className='secondary-sub'>
            <Link to='/connect' onClick={() => setIsOpen(false)}>
              Connect
            </Link>
            <Link to='/press' onClick={() => setIsOpen(false)}>
              Press
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
