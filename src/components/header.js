import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
import HideOnScroll from './hideOnScroll'
import Cart from './cart'
import useStore from '../context/StoreContext'
import Logo from '../images/logo.svg'

const Header = ({ location, setTags }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const isProjectPage = location?.pathname === '/projects/'
  const showCart =
    location?.pathname.includes('/shop/') ||
    location?.pathname.includes('/collections/')
  const { cart } = useStore()

  return (
    <>
      <header>
        <div></div>
        <HideOnScroll>
          <Link to='/'><img src={Logo} alt="Pacific"></img></Link>
        </HideOnScroll>
        {showCart && (
          <div className='shop-cart'>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className='shop-bag-button'
            >
              Cart{' '}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='cart-icon'
                viewBox='0 0 43.963 36.303'
              >
                <path
                  id='Path_3'
                  data-name='Path 3'
                  d='M11.785,45.8a.3.3,0,0,0,.114.228v.057l.171.171h.057a.3.3,0,0,0,.228.114h0L35.039,54.35a.514.514,0,0,0,.285.057,1.2,1.2,0,0,0,.627-.228L55.215,34.915a.846.846,0,0,0,.228-.8.9.9,0,0,0-.57-.627l-.912-.228a24.972,24.972,0,0,1-.228-2.964,10.983,10.983,0,0,1,.057-1.368l1.368-1.368a.846.846,0,0,0,.228-.8.9.9,0,0,0-.57-.627L32.132,18.158a.809.809,0,0,0-.912.228L12.013,37.594h0c-.057.057-.114.114-.114.171v.057c0,.057-.057.057-.057.114v.114a21.318,21.318,0,0,0-.342,3.876,21.392,21.392,0,0,0,.285,3.876Zm11.057-3.078L33.5,46.485a25.951,25.951,0,0,0-.228,3.021,19.385,19.385,0,0,0,.171,2.565L14.065,45.231,13.381,45a17.765,17.765,0,0,1-.228-3.078,19.385,19.385,0,0,1,.171-2.565Zm30.036-9.29-1.026,1.026L34.583,51.671c-.057-.684-.114-1.425-.114-2.166a19.608,19.608,0,0,1,.171-2.622l.4.171a.514.514,0,0,0,.285.057,1.2,1.2,0,0,0,.627-.228L46.837,36l5.813-5.813v.171A18.651,18.651,0,0,0,52.878,33.433Z'
                  transform='translate(-11.5 -18.104)'
                />
              </svg>{' '}
              {cart.length > 0
                ? cart
                    .map((item) => item.quantity)
                    .reduce((prev, next) => prev + next)
                : ''}
            </button>
          </div>
        )}
        <div className='header-menu'>
          <button onClick={() => setIsOpen(!isOpen)}>
            Menu{' '}
            <span className='header-menu-button'>{isOpen ? 'x' : '+'}</span>
          </button>
          <div
            className={`secondary-menu ${isOpen ? 'menu-show' : 'menu-hide'}`}
          >
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
              {/* {isProjectPage ? (
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
              )} */}
              <Link
                to='/collections/everything'
                onClick={() => setIsOpen(false)}
              >
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
      {isCartOpen && (
        <Cart toggleCart={() => setIsCartOpen(!isCartOpen)}></Cart>
      )}
    </>
  )
}

export default Header
