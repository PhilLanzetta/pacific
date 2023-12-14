import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import GoogleMap from '../components/googleMap'

const Connect = () => {
  return (
    <Layout>
      <h1 className='news-page-title'>Connect</h1>
      <div className='connect-container'>
        <div className='connect-text-container'>
          <div className='connect-text-box'>
            <div className='connect-two-column'>
              <p className='connect-title'>Office</p>
              <a
                href='https://maps.app.goo.gl/tx9VpgZexeT4MMAB8'
                target='_blank'
                rel='noreferrer'
              >
                New York <br />
                70 Flushing Avenue <br />
                Brooklyn, NY 11205
              </a>
            </div>
            <div>
              <p className='connect-title'>Emails</p>
              <div className='connect-text-grouping'>
                <div className='connect-two-column'>
                  <p>General</p>
                  <a href='mailto:businesspacificpacific.pub'>
                    businesspacificpacific.pub
                  </a>
                </div>
                <div className='connect-two-column'>
                  <p>Publishing</p>
                  <a href='mailto:publishing@pacificpacific.pub'>
                    publishing@pacificpacific.pub
                  </a>
                </div>
                <div className='connect-two-column'>
                  <p>New Business</p>
                  <a href='mailto:studio@pacificpacific.pub'>
                    studio@pacificpacific.pub
                  </a>
                </div>
                <div className='connect-two-column'>
                  <p>Press</p>
                  <a href='mailto:press@pacificpacific.pub'>
                    press@pacificpacific.pub
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div>
                <p className='connect-title'>Social</p>
                <div className='connect-text-grouping'>
                  <div className='connect-two-column'>
                    <p>Instagram</p>
                    <a
                      href='https://www.instagram.com/pacific_pacific'
                      target='_blank'
                      rel='noreferrer'
                    >
                      @pacific_pacific
                    </a>
                  </div>
                  <div className='connect-two-column'>
                    <p>Linkedin</p>
                    <a
                      href='https://www.linkedin.com/pacific_pacific'
                      target='_blank'
                      rel='noreferrer'
                    >
                      @pacific_pacific
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GoogleMap></GoogleMap>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title='Connect' />

export default Connect
