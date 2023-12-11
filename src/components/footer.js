import React, { useState } from 'react'
import { Link } from 'gatsby'
import { AiOutlineClose } from 'react-icons/ai'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import CustomForm from './customForm'
import Logo from '../images/logo.svg'

const postUrl = process.env.GATSBY_MAIL_KEY

const Footer = () => {
  const [emailOpen, setEmailOpen] = useState(false)

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
          href='https://www.linkedin.com/company/pacificpacific/'
          target='_blank'
          rel='noreferrer'
        >
          <p>
            <em>LinkedIn</em>
          </p>
          <p>@pacific_pacific</p>
        </a>
        <button onClick={() => setEmailOpen(true)}>
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
      <img src={Logo} alt='Pacific' className='footer-logo' />
      <div className='bottom-footer'>
        &copy; Pacific {new Date().getFullYear()}
        <Link to='/privacy'>Privacy</Link>
        <Link to='/shipping'>Shipping</Link>
      </div>
      <div className={`email-pop-up ${emailOpen ? 'email-pop-up-show' : ''}`}>
        <div className='email-pop-up-container'>
          <button className='email-pop-up-close'>
            <AiOutlineClose
              onClick={() => setEmailOpen(false)}
            ></AiOutlineClose>
          </button>
          <MailchimpSubscribe
            url={postUrl}
            render={({ subscribe, status, message }) => (
              <CustomForm
                status={status}
                message={message}
                onValidated={(formData) => subscribe(formData)}
                setEmailOpen={setEmailOpen}
              ></CustomForm>
            )}
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
