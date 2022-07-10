import { Link } from 'react-router-dom'

import React from 'react'

function Header() {
  
  return (
    <>
      <header className='header'>
        <div className='logo'>
          <Link to='/'>Blok Talent</Link>
        </div>
      </header>
    </>
  )
}

export default Header
