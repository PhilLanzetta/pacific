import React from 'react'
import Header from './header'
import Footer from './footer'

const Layout = ({ children, location, setTags }) => {
  return (
    <>
      <Header location={location} setTags={setTags}></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  )
}

export default Layout
