import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
import HideOnScroll from './hideOnScroll'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import Cart from './cart'
import useStore from '../context/StoreContext'

const Header = ({ location, setTags }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const isProjectPage = location?.pathname === '/projects/'
  const showCart = location?.pathname.includes('/shop/')
  const { cart } = useStore()

  return (
    <header>
      <div></div>
      <HideOnScroll>
        <Link to='/'>Pacific</Link>
      </HideOnScroll>
      {showCart && (
        <div className='shop-cart'>
          <button onClick={() => setIsCartOpen(!isCartOpen)}>
            <HiOutlineShoppingBag></HiOutlineShoppingBag>{' '}
            {cart.length > 0
              ? cart
                  .map((item) => item.quantity)
                  .reduce((prev, next) => prev + next)
              : ''}
          </button>
          {isCartOpen && (
            <Cart toggleCart={() => setIsCartOpen(!isCartOpen)}></Cart>
          )}
        </div>
      )}
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
            <Link to='/shop' onClick={() => setIsOpen(false)}>
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
