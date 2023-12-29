import React from 'react'
import "./header.css"
import Link from 'next/link'
import LoginButton from '../Components/clients/LoginButton'

const Header = () => {
  return (
    <nav  id='navBar'>
       <h1>Todo app</h1>

        <ul>
            <li><Link href={'/'}>Home</Link></li>
            <li><Link href={'/'}>Abouts</Link></li>
            <LoginButton/>
        </ul>
    </nav>
  )
}

export default Header